import type { StrategyOptionsWithRequest } from 'passport-oauth2';

export type AtlassianOAuthStrategyOptions = AtlassianOAuthStrategyConfigurableOptions &
	StrategyOptionsWithRequest & {
		authorizationURL: string;
		tokenURL: string;
		accessibleResourcesURL: string;
		profileURL: string;
	};

export type AtlassianOAuthStrategyConfigurableOptions = {
	clientID: string;
	clientSecret: string;
	callbackURL: string;
	scope: string;
};

export type OAuthError = {
	statusCode: number;
	data?: any;
};

export type AtlassianProfile = {
	id: string;
	displayName: string;
	emails: UserEmail[];
	photos: UserPhoto[];
	accessibleResources?: AtlassianAccessibleResource[];
	provider?: string;
	_raw?: string;
	_json?: AtlassianRawJSON;
};

export type AtlassianRawJSON = {
	account_id: string;
	email: string;
	name: string;
	picture: string;
	account_status: string;
	characteristics: UserCharacteristics;
	last_updated: Date;
	nickname: string;
	locale: string;
	extended_profile: unknown;
	account_type: string;
	email_verified: boolean;
};

export type UserCharacteristics = {
	not_mentionable: boolean;
};

export type UserEmail = {
	value: string;
	verified: boolean;
};

export type UserPhoto = {
	value: string;
};

export type AtlassianAccessibleResource = {
	id: string;
	url: string;
	name: string;
	scopes: string[];
	avatarUrl: string;
};
