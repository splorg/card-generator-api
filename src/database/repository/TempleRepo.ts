import type Temple from '../model/Temple'
import { TempleModel } from '../model/Temple'

async function create (name: string): Promise<Temple> {
  const now = new Date()
  const temple = new TempleModel({
    name,
    createdAt: now,
    updatedAt: now
  })

  return await temple.save()
}

async function update (temple: Temple): Promise<Temple | null> {
  temple.updatedAt = new Date()
  return await TempleModel.findByIdAndUpdate(temple.id, temple, { new: true, runValidators: true })
}

async function getAll (): Promise<Temple[]> {
  return await TempleModel.find({}).populate('cards', { name: 1, _id: 1 })
}

async function remove (id: string): Promise<Temple | null> {
  return await TempleModel.findByIdAndDelete(id)
}

async function getOne (id: string): Promise<Temple | null> {
  return await TempleModel.findById(id).populate('cards', { name: 1, _id: 1 })
}

export default {
  getAll,
  getOne,
  create,
  update,
  remove
}
