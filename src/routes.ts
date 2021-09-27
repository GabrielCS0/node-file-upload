import { Router } from 'express'
import multer from 'multer'
import config from './config/multer'
import { FileUploadController } from './useCases/fileUpload/FileUploadController'
import { GetAllFilesController } from './useCases/getAllFiles/GetAllFilesController'

const router = Router()
const { multerConfig } = config

const fileUploadController = new FileUploadController()
const getAllFilesController = new GetAllFilesController()

router.post(
  '/file',
  multer(multerConfig).single('file'),
  fileUploadController.handle
)

router.get('/file', getAllFilesController.handle)

export { router }
