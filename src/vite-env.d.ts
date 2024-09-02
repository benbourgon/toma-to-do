/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // more env variables...
}
//biome-ignore lint:noUnusedVars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
