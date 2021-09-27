import { Router } from 'express'
import multer from 'multer'
import config from './config/multer'
import { FileUploadController } from './useCases/fileUpload/FileUploadController'

const router = Router()
const { multerConfig } = config

const fileUploadController = new FileUploadController()

router.post(
  '/upload',
  multer(multerConfig).single('file'),
  fileUploadController.handle
)

export { router }
