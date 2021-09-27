import { FileDocument } from '../../models/File'
import { IFilesRepository } from '../../repositories/IFilesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllFilesUseCase {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository
  ) {}

  async execute(): Promise<FileDocument[]> {
    const files = await this.filesRepository.findAll()
    return files
  }
}
