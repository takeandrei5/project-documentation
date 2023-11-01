import express, { Request, Response, Router } from 'express';
import passport from 'passport';
import { defaultAxiosInstance } from '../../../axios';
import { hasAccessToken, hasRefreshToken } from '../../../middlewares';
import AtlassianStrategy from '../../../strategies/AtlassianStrategy';
import { AtlassianProfile } from '../../../strategies/types';
import { isAuthorizationTokenExpired } from './utils';
import { OAuthRefreshTokenResponse } from './types';


// const options: AtlassianOAuthStrategyConfigurableOptions = {
// 	clientID: process.env.JIRA_OAUTH_CLIENT_ID as string,
// 	clientSecret: process.env.JIRA_OAUTH_CLIENT_SECRET as string,
// 	callbackURL: process.env.JIRA_OAUTH_CALLBACK_URL as string,
// 	scope: 'read:me read:jira-work read:jira-user read:issue-meta:jira read:field:jira read:project:jira write:jira-work manage:jira-webhook write:webhook:jira offline_access'
// };

const options = {
	clientID: 'QmLaNOfOioSDxraVUnmLuBf9UqKae8lz',
	clientSecret: 'ATOAr5h9xFfOFaL4HyLjIddiX5A2tdZlGvrZyiVkgrhlZ3Hi9gBmPP87CW4Sn1sRIZd7D325D408',
	callbackURL: 'http://localhost:8000/api/jira/auth/callback',
	scope: 'read:me read:jira-work read:jira-user read:issue-meta:jira read:field:jira read:project:jira write:jira-work manage:jira-webhook write:webhook:jira offline_access'
};

const jiraAuthRouter: Router = express.Router();

const authAxiosInstance = defaultAxiosInstance;

passport.use(
	new AtlassianStrategy(options, (req: Request, accessToken: string, refreshToken: string, profile: AtlassianProfile, cb: Function) => {
		if (req.res) {
			req.res.locals.accessToken = accessToken;
			req.res.locals.refreshToken = refreshToken;
			req.res.locals.accessibleResourceIds = profile.accessibleResources?.map((resource) => resource.id) || [];
		}

		cb(null, profile);
	})
);

passport.serializeUser((user: unknown, cb: Function) => cb(null, user));
passport.deserializeUser((obj: unknown, cb: Function) => cb(null, obj));

jiraAuthRouter.get('/', hasAccessToken, hasRefreshToken, async (req: Request, res: Response) => {
	if (res.locals.hasAccessToken) {
		const response = await authAxiosInstance.get('https://api.atlassian.com/oauth/token/accessible-resources', {
			headers: {
				Authorization: req.headers.authorization
			}
		});

		if (response.status === 200) {
			return res.send('already authorized');
		}
	}

	if (res.locals.hasRefreshToken && !isAuthorizationTokenExpired(req.body.refresh_token)) {
		const postRequest = await authAxiosInstance.post<OAuthRefreshTokenResponse>('https://auth.atlassian.com/oauth/token', {
			grant_type: 'refresh_token',
			client_id: options.clientID,
			client_secret: options.clientSecret,
			refresh_token: req.body.refresh_token
		});

		if (postRequest.status !== 200) {
			passport.authenticate('atlassian')(req, res);
			return;
		}

		return res.send('refreshed token');
	}

	passport.authenticate('atlassian')(req, res);
});

jiraAuthRouter.get('/callback', passport.authenticate('atlassian', { failureRedirect: '/api/jira/auth/error' }), async (req: Request, res: Response) => {
	res.status(200).send({
		accessToken: res.locals.accessToken,
		refreshToken: res.locals.refreshToken,
		accessibleResourceIds: res.locals.accessibleResourceIds
	});
});

jiraAuthRouter.get('/error', (_, res: Response) => {
	res.send('Authorization error :(');
});

export default jiraAuthRouter;