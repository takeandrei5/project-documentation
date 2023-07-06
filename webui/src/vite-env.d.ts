/// <reference types="vite/client" />

interface ImportMetaEnv {
<<<<<<< HEAD
  readonly VITE_TINY_MCE_API_KEY: string
=======
  readonly VITE_AUTH0_DOMAIN: string
  readonly VITE_AUTH0_CLIENT_ID: string
<<<<<<< HEAD
>>>>>>> cc84012 (feature/at/add-sign-up-with-auth0)
=======
  readonly VITE_TINY_MCE_API_KEY: string
>>>>>>> c25480a (feat: adjustment to text editor)
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}