import { FileDocument } from 'src/models/File'
import { IFileUploadDTO } from 'src/useCases/fileUpload/IFileUploadDTO'

export interface IFilesRepository {
  create(data: IFileUploadDTO): Promise<FileDocument>
}
