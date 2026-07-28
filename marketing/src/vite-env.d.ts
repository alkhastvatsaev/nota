/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_APP_URL?: string;
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_FOUNDER_LINKEDIN?: string;
  readonly VITE_FOUNDER_GITHUB?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
