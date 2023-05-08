import { Schema, model, type Types } from 'mongoose'
import type Skill from './Skill'
import type Tribe from './Tribe'
import type Temple from './Temple'

export enum RarityLevels {
  COMMON = 'Common',
  RARE = 'Rare',
  SUPER_RARE = 'Super Rare'
}

export default interface Card {
  id: Types.ObjectId
  name: string
  rarity: RarityLevels
  healthPoints: number
  powerPoints: number
  skills: Skill[]
  tribe: Tribe
  temple: Temple
  createdAt?: Date
  updatedAt?: Date
}

const schema = new Schema<Card>({
  name: {
    type: Schema.Types.String,
    required: [true, 'Name must be provided!'],
    maxlength: [64, 'Name must be at most 64 characters long!'],
    minlength: [3, 'Name must be at least 3 characters long!'],
    trim: true
  },
  rarity: {
    type: Schema.Types.String,
    required: [true, 'Rarity must be provided!'],
    enum: { values: Object.values(RarityLevels), message: "Rarity must be 'Common', 'Rare', or 'Super Rare'!" }
  },
  healthPoints: {
    type: Schema.Types.Number,
    min: [1, 'Cards must have at least 1 HP!'],
    max: [100, 'Cards can have at most 100 HP!'],
    required: [true, 'HP must be provided!']
  },
  powerPoints: {
    type: Schema.Types.Number,
    min: [1, 'Cards must have at least 1 PP!'],
    max: [100, 'Cards can have at most 100 PP!'],
    required: [true, 'PP must be provided!']
  },
  skills: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Skill'
    }],
    validate: [skillLimit, 'A card can have at most 4 skills!']
  },
  tribe: {
    type: Schema.Types.ObjectId,
    ref: 'Tribe',
    required: [true, 'Card must belong to an existing tribe!']
  },
  temple: {
    type: Schema.Types.ObjectId,
    ref: 'Temple',
    required: [true, 'Card must belong to an existing temple!']
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

function skillLimit (val: any) {
  return val.length <= 4
}

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

export const CardModel = model<Card>('Card', schema, 'cards')
