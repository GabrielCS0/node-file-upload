import MockMongo from './mockDatabase'
import request from 'supertest'
import { app } from '../app'
import { resolve } from 'path'
import fs from 'fs'

describe('Upload File', () => {
  const mockMongo = new MockMongo()
  let fileKey: string

  async function uploadedFileExists(
    uploadedFilePath: string
  ): Promise<boolean> {
    return await fs.promises
      .access(uploadedFilePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false)
  }

  beforeAll(async () => {
    await mockMongo.connect()
  })

  afterAll(async () => {
    await mockMongo.disconnect()
  })

  it('Should be able to upload a file', async () => {
    const filePath = resolve(__dirname, 'files', 'file.jpg')
    const response = await request(app).post('/file').attach('file', filePath)
    fileKey = response.body.key

    const uploadedFile = resolve(
      __dirname,
      '..',
      '..',
      'tmp',
      'uploadTests',
      fileKey
    )

    const fileExists = await uploadedFileExists(uploadedFile)

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('_id')
    expect(response.body.name).toBe('file.jpg')
    expect(fileExists).toBe(true)
  })

  it('Should be able to list all files', async () => {
    const response = await request(app).get('/file')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty('key')
  })

  it('Should be able to delete a file', async () => {
    const response = await request(app).delete(`/file/${fileKey}`)

    const uploadedFile = resolve(
      __dirname,
      '..',
      '..',
      'tmp',
      'uploadTests',
      fileKey
    )

    const fileExists = await uploadedFileExists(uploadedFile)

    expect(response.status).toBe(200)
    expect(fileExists).toBe(false)
  })
})
