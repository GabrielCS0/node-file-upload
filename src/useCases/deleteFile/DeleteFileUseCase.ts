import { IFilesRepository } from '../../repositories/IFilesRepository'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../errors/AppError'

@injectable()
export class DeleteFileUseCase {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository
  ) {}

  async execute(key: string): Promise<void> {
    const file = await this.filesRepository.findByKey(key)
    if (!file) throw new AppError('The provided key is invalid.')

    await this.filesRepository.deleteByKey(key)
  }
}
