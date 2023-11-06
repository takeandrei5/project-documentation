import { NextFunction, Request, Response } from 'express';
import { ReqQuery } from './types';

const hasRefreshToken = (req: Request<{}, {}, {}, Partial<ReqQuery>>, res: Response, next: NextFunction) => {
	res.locals.hasRefreshToken = Boolean(req.query && req.query?.refresh_token);

	if (!res.locals.hasRefreshToken && (res.locals.hasAccessToken || req.originalUrl !== '/api/jira/auth')) {
		return res.status(401).send('Missing refresh token');
	}

	next();
};

export default hasRefreshToken;
