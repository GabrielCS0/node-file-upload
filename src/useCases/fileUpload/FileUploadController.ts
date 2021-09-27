import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { FileUploadUseCase } from './FileUploadUseCase'

export class FileUploadController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { originalname: name, size, key } = req.file

    const fileUploadUseCase = container.resolve(FileUploadUseCase)

    const file = await fileUploadUseCase.execute({ name, size, key })

    return res.status(201).json(file)
  }
}
