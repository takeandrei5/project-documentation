import { NextFunction, Request, Response } from 'express';
import { ReqQuery } from './types';

const hasRefreshToken = (req: Request<{}, {}, {}, Partial<ReqQuery>>, res: Response, next: NextFunction) => {
	res.locals.hasRefreshToken = Boolean(req.query && req.query?.refreshToken);

	if (!res.locals.hasRefreshToken && (res.locals.hasAccessToken || req.baseUrl !== '/api/jira/auth')) {
		return res.status(401).send('Missing refresh token');
	}

	next();
};

export default hasRefreshToken;
