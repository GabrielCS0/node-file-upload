import mongoose from 'mongoose'

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log(`Error connecting with MongoDB: ${err}`))
}

export { mongoose }
