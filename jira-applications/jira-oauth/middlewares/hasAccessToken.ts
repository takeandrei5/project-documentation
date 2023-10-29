import { NextFunction, Request, Response } from 'express';

const hasAccessToken = async (req: Request, res: Response, next: NextFunction) => {
	res.locals.hasAccessToken = req.headers.authorization && req.headers.authorization.startsWith('Bearer ');

	next();
};

export default hasAccessToken;
