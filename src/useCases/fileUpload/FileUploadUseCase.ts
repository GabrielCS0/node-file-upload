import { IFileUploadDTO } from './IFileUploadDTO'
import { FileDocument } from '../../models/File'
import { IFilesRepository } from '../../repositories/IFilesRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class FileUploadUsecase {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository
  ) {}

  async execute({
    name,
    size,
    key,
    url
  }: IFileUploadDTO): Promise<FileDocument> {
    const file = await this.filesRepository.create({ name, size, key, url })
    return file
  }
}
