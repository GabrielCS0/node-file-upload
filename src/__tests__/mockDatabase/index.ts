import mongoose, { Mongoose } from 'mongoose'

export default class MockMongo {
  private database: Mongoose

  async connect(): Promise<void> {
    if (!process.env.MONGO_URL) {
      throw new Error('MongoDB server not initialized')
    }

    this.database = await mongoose.connect(process.env.MONGO_URL)
  }

  async disconnect(): Promise<void> {
    await this.database.connection.dropDatabase()
    await this.database.connection.close()
  }
}
