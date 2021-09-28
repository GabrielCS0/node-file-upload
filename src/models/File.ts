import { Schema, Document, model } from 'mongoose'
import { unlink } from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'
import { uploadFolder } from '../config/multer'

interface IFile {
  name: string
  size: number
  key: string
  url: string
}

export type FileDocument = Document & IFile

const FileSchema = new Schema<IFile>(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    size: {
      type: Number,
      required: true
    },
    key: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    url: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
)

FileSchema.pre('save', function () {
  if (!this.url) this.url = `${process.env.APP_URL}/files/${this.key}`
})

FileSchema.pre('findOneAndDelete', function () {
  const path = resolve(
    __dirname,
    '..',
    '..',
    'tmp',
    uploadFolder,
    this.getFilter().key
  )

  if (process.env.STORAGE_TYPE === 'local') promisify(unlink)(path)
})

export default model<FileDocument>('File', FileSchema)
