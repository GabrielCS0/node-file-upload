import { container } from 'tsyringe'

import { IFilesRepository } from '../repositories/IFilesRepository'
import { FilesRepository } from '../repositories/implementations/FilesRepository'

container.registerSingleton<IFilesRepository>(
  'FilesRepository',
  FilesRepository
)
