import 'reflect-metadata'
import 'dotenv/config'
import './container'
import './database'
import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(router)
app.use(morgan('dev'))

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

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server is running on port ${process.env.PORT || 5000}`)
)
