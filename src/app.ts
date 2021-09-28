import 'reflect-metadata'
import 'dotenv/config'
import './container'
import './database'
import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import { router } from './routes'
import path from 'path'

const app = express()

app.use(express.json())
app.use(router)
app.use(morgan('dev'))

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err)

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

export { app }
