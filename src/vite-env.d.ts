/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_PROXY_FLYFF_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
