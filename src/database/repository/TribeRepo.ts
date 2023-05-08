import type Tribe from '../model/Tribe'
import { TribeModel } from '../model/Tribe'

async function create (name: string): Promise<Tribe> {
  const now = new Date()
  const tribe = new TribeModel({
    name,
    createdAt: now,
    updatedAt: now
  })

  return await tribe.save()
}

async function update (tribe: Tribe): Promise<Tribe | null> {
  tribe.updatedAt = new Date()
  return await TribeModel.findByIdAndUpdate(tribe.id, tribe, { new: true, runValidators: true })
}

async function getAll (): Promise<Tribe[]> {
  return await TribeModel.find({}).populate('cards', { name: 1, _id: 1 })
}

async function remove (id: string): Promise<Tribe | null> {
  return await TribeModel.findByIdAndDelete(id)
}

async function getOne (id: string): Promise<Tribe | null> {
  return await TribeModel.findById(id).populate('cards', { name: 1, _id: 1 })
}

export default {
  getAll,
  getOne,
  create,
  update,
  remove
}
