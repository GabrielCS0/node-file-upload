import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetAllFilesUseCase } from './GetAllFilesUseCase'

export class GetAllFilesController {
  async handle(_: Request, res: Response): Promise<Response> {
    const getAllFilesUseCase = container.resolve(GetAllFilesUseCase)

    const files = await getAllFilesUseCase.execute()

    return res.json(files)
  }
}
