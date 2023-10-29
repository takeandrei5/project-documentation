import { NextFunction, Request, Response } from 'express';
import { defaultAxiosInstance } from '../axios';

const validateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
	if (!res.locals.hasAccessToken || !res.locals.hasRefreshToken) {
		return res.status(401).send('Missing access token or refresh token');
	}

	const response = await defaultAxiosInstance.get('/rest/api/3/myself', {
		headers: {
			Authorization: req.headers.authorization
		}
	});

	if (response.status !== 200) {
		return res.status(401).send('Invalid access token');
	}

	next();
};

export default validateAccessToken;
