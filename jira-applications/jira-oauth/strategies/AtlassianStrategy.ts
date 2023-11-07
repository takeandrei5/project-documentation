import OAuth2Strategy, { VerifyFunctionWithRequest } from 'passport-oauth2';
import type { AtlassianOAuthStrategyConfigurableOptions, AtlassianOAuthStrategyOptions, AtlassianProfile, AtlassianRawJSON } from './types';
import { OAuthError } from './types';

const defaultOptions = {
	authorizationURL: 'https://auth.atlassian.com/authorize',
	tokenURL: 'https://auth.atlassian.com/oauth/token',
	profileURL: 'https://api.atlassian.com/me',
	accessibleResourcesURL: 'https://api.atlassian.com/oauth/token/accessible-resources'
};

class AtlassianStrategy extends OAuth2Strategy {
	private options: AtlassianOAuthStrategyOptions;

	constructor(configurableOptions: AtlassianOAuthStrategyConfigurableOptions, verify: VerifyFunctionWithRequest) {
		if (!configurableOptions.scope) {
			throw new TypeError('AtlassianOAuth2 requires a scope option');
		}

		const options: AtlassianOAuthStrategyOptions = {
			...defaultOptions,
			...configurableOptions,
      passReqToCallback: true
		};

		super(options, verify);
		this.options = options;
		this.name = 'atlassian';
		this._oauth2.useAuthorizationHeaderforGET(true);
	}

	authorizationParams() {
		return {
			audience: 'api.atlassian.com',
			prompt: 'consent'
		};
	}

	userProfile(accessToken: string, done: Function): void {
		this._oauth2.get(this.options.profileURL, accessToken, (err: OAuthError, body?: string | Buffer) => {
			if (err) {
				return done(err);
			}

			if (!body) {
				return done(new Error('Failed to parse user profile.'));
			}

			let profile: AtlassianProfile;

			try {
				const json: AtlassianRawJSON = JSON.parse(body.toString());

				profile = this._convertProfileFields(json);
				profile.provider = 'atlassian';
				profile._raw = body.toString();
				profile._json = json;
			} catch (e) {
				return done(new Error('Failed to parse user profile'));
			}

			this._oauth2.get(this.options.accessibleResourcesURL, accessToken, (errAr: OAuthError, bodyAr?: string | Buffer) => {
				if (errAr) {
					return done(errAr);
				}

				if (!bodyAr) {
					return done(new Error('Failed to parse accessible resources'));
				}

				try {
					profile.accessibleResources = JSON.parse(bodyAr.toString());

					done(null, profile);
				} catch (e) {
					return done(new Error('Failed to parse accessible resources'));
				}
			});
		});
	}

	_convertProfileFields(json: AtlassianRawJSON): AtlassianProfile {
		return {
			id: json.account_id,
			displayName: json.name,
			emails: [{ value: json.email, verified: json.email_verified }],
			photos: [{ value: json.picture }]
		};
	}
}

export default AtlassianStrategy;
