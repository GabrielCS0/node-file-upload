import File, { FileDocument } from '../../models/File'
import { IFileUploadDTO } from '../../useCases/fileUpload/IFileUploadDTO'
import { IFilesRepository } from '../IFilesRepository'

export class FilesRepository implements IFilesRepository {
  async create({
    name,
    size,
    key,
    url
  }: IFileUploadDTO): Promise<FileDocument> {
    const file = new File({ name, size, key, url })
    await file.save()

    return file
  }
}
