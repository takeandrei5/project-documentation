import { BrowserCacheLocation, PublicClientApplication } from '@azure/msal-browser';
import type { Configuration, PopupRequest } from '@azure/msal-browser';

const apiScopes = import.meta.env.VITE_AZURE_API_SCOPES.split(',');
const msalConfig: Configuration = {
	auth: {
		clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
		authority: import.meta.env.VITE_AZURE_AUTHORITY,
		redirectUri: import.meta.env.VITE_AZURE_REDIRECT_URI,
		navigateToLoginRequestUrl: true
	},
	cache: {
		cacheLocation: BrowserCacheLocation.LocalStorage,
		storeAuthStateInCookie: true
	},
	system: {
		allowNativeBroker: false // Disables WAM Broker
	}
};

const loginRequest: PopupRequest = {
	scopes: [...apiScopes]
};

const msalInstance = new PublicClientApplication(msalConfig);

export { msalInstance, loginRequest };
