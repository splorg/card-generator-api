import * as dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT ?? 3000
export const DATABASE_URL = process.env.DATABASE_URL
  ? `${process.env.DATABASE_URL}/card-generator?retryWrites=true&w=majority`
  : 'mongodb://mongo:27017/card-generator?retryWrites=true&w=majority'
