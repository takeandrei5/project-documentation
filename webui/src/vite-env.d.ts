/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_TINY_MCE_API_KEY: string;
	readonly VITE_AZURE_CLIENT_ID: string;
	readonly VITE_AZURE_AUTHORITY: string;
	readonly VITE_AZURE_REDIRECT_URI: string;
	readonly VITE_AZURE_GRAPH_SCOPES: string;
	readonly VITE_AZURE_API_SCOPES: string;
	readonly VITE_OPEN_AI_API_KEY: string;
	readonly VITE_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
