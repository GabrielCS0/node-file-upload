declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: number
    MONGO_URL: string
    STORAGE_TYPE: string
    APP_URL: string
    NODE_ENV: string
  }
}
