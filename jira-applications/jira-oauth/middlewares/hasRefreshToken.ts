import { NextFunction, Request, Response } from 'express';
import { ReqQuery } from './types';

const hasRefreshToken = (req: Request<{}, {}, {}, Partial<ReqQuery>>, res: Response, next: NextFunction) => {
	res.locals.hasRefreshToken = Boolean(req.query && req.query?.refreshToken);

	next();
};

export default hasRefreshToken;
