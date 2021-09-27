import { IFilesRepository } from '../../repositories/IFilesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteFileUseCase {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository
  ) {}

  async execute(key: string): Promise<void> {
    await this.filesRepository.deleteByKey(key)
  }
}
