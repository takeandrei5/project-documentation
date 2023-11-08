import { NextFunction, Request, Response } from 'express';

const hasAccessToken = async (req: Request, res: Response, next: NextFunction) => {
	res.locals.hasAccessToken = !!req.query.accessToken;

	next();
};

export default hasAccessToken;
