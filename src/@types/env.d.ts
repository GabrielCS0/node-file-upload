declare namespace NodeJS {
  export interface ProcessEnv {
    PORT?: number
    MONGO_URL: string
    STORAGE_TYPE: string
  }
}
