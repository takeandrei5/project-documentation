export type OAuthRefreshTokenResponse = {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
};
