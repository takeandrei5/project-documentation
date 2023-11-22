import { NextFunction, Request, Response } from 'express';
import { defaultAxiosInstance } from '../axios';
import { OAuthRefreshTokenResponse, ReqQuery } from './types';
import { isAuthorizationTokenExpired } from './utils';
import passport from 'passport';

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

const authAxiosInstance = defaultAxiosInstance;

const validateAccessAndRefreshTokens = async (req: Request<{}, any, {}, ReqQuery & { redirectUrl: string }>, res: Response, next: NextFunction) => {
  if (!req.query.accessToken && !req.query.refreshToken) {
    res.setHeader('Link', `/api/jira/auth?redirectUrl=${req.headers.referer}`).status(302).send();
		return;
	}

	if (res.locals.hasAccessToken) {
		const response = await authAxiosInstance.get('https://api.atlassian.com/oauth/token/accessible-resources', {
			headers: {
				Authorization: `Bearer ${req.query.accessToken}`
			}
		});

		if (response.status === 200) {
			next();
			return;
		}

		if (response.status === 401) {
			res.setHeader('Link', `/api/jira/auth?redirectUrl=${req.headers.referer}`).status(302).send();
			return;
		}
	}

  // TODO: Fix this
	// if (res.locals.hasRefreshToken && !isAuthorizationTokenExpired(req.query.accessToken)) {
	// 	const postRequest = await authAxiosInstance.post<OAuthRefreshTokenResponse>('https://auth.atlassian.com/oauth/token', {
	// 		grant_type: 'refresh_token',
	// 		client_id: options.clientID,
	// 		client_secret: options.clientSecret,
	// 		refresh_token: req.query.refreshToken
	// 	});


	// 	if (postRequest.status !== 200) {
	// 		res.setHeader('Link', `/api/jira/auth?redirectUrl=${req.headers.referer}`).status(302).send();
	// 		return;
	// 	}
	// }

	next();
};

export default validateAccessAndRefreshTokens;
