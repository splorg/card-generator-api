import type Card from '../model/Card'
import { CardModel } from '../model/Card'
import { TribeModel } from '../model/Tribe'
import { TempleModel } from '../model/Temple'
import { type Types } from 'mongoose'

interface CreateCardProps {
  name: string
  rarity: string
  healthPoints: number
  powerPoints: number
  skills: Types.ObjectId[]
  tribe: Types.ObjectId
  temple: Types.ObjectId
}

async function create ({
  name,
  rarity,
  healthPoints,
  powerPoints,
  skills,
  tribe,
  temple
}: CreateCardProps): Promise<Card> {
  const card = new CardModel({
    name,
    rarity,
    healthPoints,
    powerPoints,
    skills,
    temple,
    tribe,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  // non-null assertions here because its been validated on the router
  // (also because im typescript noob)
  const tribeObj = (await TribeModel.findById(tribe))!
  const templeObj = (await TempleModel.findById(temple))!

  const createdCard = await card.save()

  tribeObj.cards = tribeObj.cards.concat(createdCard.id)
  templeObj.cards = templeObj.cards.concat(createdCard.id)

  await tribeObj.save()
  await templeObj.save()

  return createdCard
}

async function update (card: Card): Promise<Card | null> {
  card.updatedAt = new Date()
  return await CardModel.findByIdAndUpdate(card.id, card, { new: true, runValidators: true })
}

async function getAll (): Promise<Card[]> {
  return await CardModel
    .find({})
    .populate('tribe', { name: 1, _id: 1 })
    .populate('temple', { name: 1, _id: 1 })
    .populate('skills', { name: 1, _id: 1 })
}

async function deleteCard (id: string): Promise<Card | null> {
  return await CardModel.findByIdAndDelete(id)
}

async function getOne (id: string): Promise<Card | null> {
  return await CardModel.findById(id)
    .populate('tribe', { name: 1, _id: 1 })
    .populate('temple', { name: 1, _id: 1 })
    .populate('skills', { name: 1, _id: 1 })
}

async function getFiltered (filters: any): Promise<Card[] | null> {
  return await CardModel.find(filters)
    .populate('tribe', { name: 1, _id: 1 })
    .populate('temple', { name: 1, _id: 1 })
    .populate('skills', { name: 1, _id: 1 })
}

export default {
  getAll,
  getOne,
  getFiltered,
  create,
  update,
  deleteCard
}
