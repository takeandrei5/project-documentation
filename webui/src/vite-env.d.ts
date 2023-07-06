/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TINY_MCE_API_KEY: string
  readonly VITE_AUTH0_DOMAIN: string
  readonly VITE_AUTH0_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}