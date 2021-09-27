import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import { Request } from 'express-serve-static-core'
import { Callback } from 'mongoose'

export default {
  multerConfig: {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
      destination: (_, file: Express.Multer.File, cb: Callback) => {
        cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
      },
      filename: (_: Request, file: Express.Multer.File, cb: Callback) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err, false)

          const fileName = `${hash.toString('hex')}-${file.originalname}`
          cb(null, fileName)
        })
      }
    }),
    limits: {
      fileSize: 2 * 1024 * 1024 // 2MB
    },
    fileFilter: (_: Request, file: Express.Multer.File, cb: Callback): void => {
      const allowedMimes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/gif'
      ]

      if (allowedMimes.includes(file.mimetype)) cb(null, true)
      else cb(new Error('Invalid file type.'), false)
    }
  }
}
