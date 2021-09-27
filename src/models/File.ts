import { Schema, Document, model } from 'mongoose'

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

export default model<FileDocument>('File', FileSchema)
