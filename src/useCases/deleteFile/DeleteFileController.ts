import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteFileUseCase } from './DeleteFileUseCase'

export class DeleteFileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { key } = req.params

    const deleteFileUseCase = container.resolve(DeleteFileUseCase)

    await deleteFileUseCase.execute(key)

    return res.send()
  }
}
