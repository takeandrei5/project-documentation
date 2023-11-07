import jwt, { JwtPayload } from 'jsonwebtoken';

const isAuthorizationTokenExpired = (token: string | null) => {
	if (!token) {
		return true;
	}

	const actualToken = token.split('Bearer ')[1];

	const decoded = jwt.decode(actualToken) as JwtPayload;
	if (!decoded.exp) {
		return true;
	}

	const expiry = decoded.exp;
	const now = new Date();

	return now.getTime() > expiry * 1000;
};

export { isAuthorizationTokenExpired };
