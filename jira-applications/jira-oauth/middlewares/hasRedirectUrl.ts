import { NextFunction, Request, Response } from 'express';

const hasRedirectUrl = (req: Request<{}, {}, {}, { redirectUrl: string }>, res: Response, next: NextFunction) => {
	res.locals.hasRedirectUrl = Boolean(req.query && req.query?.redirectUrl);

	next();
};

export default hasRedirectUrl;
