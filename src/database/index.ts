import mongoose from 'mongoose'
import { DATABASE_URL } from '../utils/config'

class Database {
  private static _database: Database
  private constructor () {
    const dbUrl = DATABASE_URL
    mongoose.connect(dbUrl)
      .then(() => { console.log('Connected to MongoDB.') })
      .catch(() => { console.log('Error connecting to MongoDB.') })
  }

  static getInstance (): Database {
    if (this._database) {
      return this._database
    }
    this._database = new Database()
    return this._database
  }
}

export default Database
