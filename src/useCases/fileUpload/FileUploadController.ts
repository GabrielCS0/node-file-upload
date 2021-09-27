import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FileUploadUsecase } from './FileUploadUseCase'

export class FileUploadController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { originalname: name, size, filename: key } = req.file

    const fileUploadUseCase = container.resolve(FileUploadUsecase)

    const file = await fileUploadUseCase.execute({ name, size, key, url: 'x' })

    return res.status(201).json(file)
  }
}
