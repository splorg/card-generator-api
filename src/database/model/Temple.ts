import { Schema, model, type Types } from 'mongoose'
import type Card from './Card'

export default interface Temple {
  id?: Types.ObjectId
  name: string
  createdAt?: Date
  updatedAt?: Date
  cards: Card[]
}

const schema = new Schema<Temple>({
  name: {
    type: Schema.Types.String,
    required: [true, 'Name must be provided!'],
    maxlength: [64, 'Name must be at most 64 characters long!'],
    minlength: [3, 'Name must be at least 3 characters long!'],
    trim: true
  },
  createdAt: {
    type: Schema.Types.Date,
    required: [true, 'Must provide a valid date for creation!']
  },
  updatedAt: {
    type: Schema.Types.Date,
    required: [true, 'Must provide a valid date for the last update!']
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Card'
    }
  ]
})

schema.set('toJSON', {
  transform: (doc, returnedDoc) => {
    returnedDoc.id = returnedDoc._id.toString()
    delete returnedDoc._id
    delete returnedDoc.__v
  }
})

schema.set('toObject', {
  transform: (doc, returnedDoc) => {
    returnedDoc.id = returnedDoc._id.toString()
    delete returnedDoc._id
    delete returnedDoc.__v
  }
})

export const TempleModel = model<Temple>('Temple', schema, 'temples')
