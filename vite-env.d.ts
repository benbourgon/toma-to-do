/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
