/// <reference types="vite/client" />

// declare const REACT_APP_API_URL: string
declare const VITE_REACT_APP_API_URL: string

interface ImportMetaEnv {
  // readonly REACT_APP_API_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
