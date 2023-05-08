import type Skill from '../model/Skill'
import { SkillModel } from '../model/Skill'

async function create (name: string): Promise<Skill> {
  const now = new Date()
  const skill = new SkillModel({
    name,
    createdAt: now,
    updatedAt: now
  })

  return await skill.save()
}

async function update (skill: Skill): Promise<Skill | null> {
  skill.updatedAt = new Date()
  return await SkillModel.findByIdAndUpdate(skill.id, skill, { new: true, runValidators: true })
}

async function getAll (): Promise<Skill[]> {
  return await SkillModel.find({})
}

async function remove (id: string): Promise<Skill | null> {
  return await SkillModel.findByIdAndDelete(id)
}

async function getOne (id: string): Promise<Skill | null> {
  return await SkillModel.findById(id)
}

async function findSkillsByName (param: string[]): Promise<Skill[] | null> {
  return await SkillModel.find({ _id: { $in: param } })
}

export default {
  getAll,
  getOne,
  create,
  update,
  remove,
  findSkillsByName
}
