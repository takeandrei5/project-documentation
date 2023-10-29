import { NextFunction, Request, Response } from 'express';

const hasRefreshToken = (req: Request, res: Response, next: NextFunction) => {
	res.locals.hasRefreshToken = Boolean(req.body && req.body?.refresh_token);

  console.log('hasRefreshToken', res.locals.hasRefreshToken);
	if (!res.locals.hasRefreshToken && req.originalUrl !== '/api/jira/auth') {
		return res.status(401).send('Missing refresh token');
	}

	next();
};

export default hasRefreshToken;
