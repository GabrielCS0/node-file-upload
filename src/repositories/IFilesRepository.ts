import { FileDocument } from '../models/File'
import { IFileUploadDTO } from '../useCases/fileUpload/IFileUploadDTO'

export interface IFilesRepository {
  create(data: IFileUploadDTO): Promise<FileDocument>
  findAll(): Promise<FileDocument[]>
  deleteByKey(key: string): Promise<void>
}
