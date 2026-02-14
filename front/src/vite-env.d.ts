/// <reference types="vite/client" />

// Extra safe typing for import.meta.env usage in TypeScript files
interface ImportMetaEnv {
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
