import { Schema, model, type Types } from 'mongoose'

export default interface Skill {
  id: Types.ObjectId
  name: string
  createdAt?: Date
  updatedAt?: Date
}

const schema = new Schema<Skill>({
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
  }
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

export const SkillModel = model<Skill>('Skill', schema, 'skills')
