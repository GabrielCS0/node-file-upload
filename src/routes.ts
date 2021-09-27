import { Router } from 'express'
import multer from 'multer'
import config from './config/multer'
import { DeleteFileController } from './useCases/deleteFile/DeleteFileController'
import { FileUploadController } from './useCases/fileUpload/FileUploadController'
import { GetAllFilesController } from './useCases/getAllFiles/GetAllFilesController'

const router = Router()
const { multerConfig } = config

const fileUploadController = new FileUploadController()
const getAllFilesController = new GetAllFilesController()
const deleteFileController = new DeleteFileController()

router.post(
  '/file',
  multer(multerConfig).single('file'),
  fileUploadController.handle
)

router.get('/file', getAllFilesController.handle)

router.delete('/file/:key', deleteFileController.handle)

export { router }
