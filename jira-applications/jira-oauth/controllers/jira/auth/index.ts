import express, { Request, Response, Router } from 'express';
import passport from 'passport';
import { defaultAxiosInstance } from '../../../axios';
import hasRedirectUrl from '../../../middlewares/hasRedirectUrl';
import { ReqQuery } from '../../../middlewares/types';
import AtlassianStrategy from '../../../strategies/AtlassianStrategy';
import { AtlassianProfile } from '../../../strategies/types';

// const options: AtlassianOAuthStrategyConfigurableOptions = {
// 	clientID: process.env.JIRA_OAUTH_CLIENT_ID as string,
// 	clientSecret: process.env.JIRA_OAUTH_CLIENT_SECRET as string,
// 	callbackURL: process.env.JIRA_OAUTH_CALLBACK_URL as string,
// 	scope: 'read:me read:jira-work read:jira-user read:issue-meta:jira read:field:jira read:project:jira write:jira-work manage:jira-webhook write:webhook:jira offline_access'
// };

const options = {
	clientID: 'QmLaNOfOioSDxraVUnmLuBf9UqKae8lz',
	clientSecret: 'ATOAr5h9xFfOFaL4HyLjIddiX5A2tdZlGvrZyiVkgrhlZ3Hi9gBmPP87CW4Sn1sRIZd7D325D408',
	callbackURL: 'http://localhost/api/jira/auth/callback',
	scope: 'read:me read:jira-work read:jira-user read:issue-meta:jira read:field:jira read:project:jira write:jira-work manage:jira-webhook write:webhook:jira offline_access'
};

const jiraAuthRouter: Router = express.Router();

passport.use(
	new AtlassianStrategy(options, (req: Request, accessToken: string, refreshToken: string, profile: AtlassianProfile, cb: Function) => {
		if (req.res) {
			req.res.locals.accessToken = accessToken;
			req.res.locals.refreshToken = refreshToken;
			req.res.locals.accessibleResourceIds = profile.accessibleResources?.map((resource) => resource.id) || [];
			req.res.locals.redirectUrl = req.query.state;
		}

		cb(null, profile);
	})
);

passport.serializeUser((user: unknown, cb: Function) => cb(null, user));
passport.deserializeUser((obj: unknown, cb: Function) => cb(null, obj));

jiraAuthRouter.get('/', hasRedirectUrl, async (req: Request<{}, any, {}, ReqQuery & { redirectUrl: string }>, res: Response) => {
	if (!req.query.redirectUrl) {
		return res.status(400).send('Missing redirectUrl');
	}

	passport.authenticate('atlassian', {
		state: req.query.redirectUrl
	})(req, res);
});

jiraAuthRouter.get('/callback', passport.authenticate('atlassian', { failureRedirect: '/api/jira/auth/error' }), async (req: Request, res: Response) => {
	const payload: string = JSON.stringify({
		accessToken: res.locals.accessToken,
		refreshToken: res.locals.refreshToken,
		accessibleResourceIds: res.locals.accessibleResourceIds
	});

	res.redirect(307, `${res.locals.redirectUrl}?payload=${payload}`);
});

jiraAuthRouter.get('/error', (_, res: Response) => {
	res.send('Authorization error :(');
});

export default jiraAuthRouter;
