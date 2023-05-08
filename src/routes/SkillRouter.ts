import express from 'express'
import SkillRepo from '../database/repository/SkillRepo'
import { Types } from 'mongoose'

const router = express.Router()

router.get('/', async (req, res) => {
  const skills = await SkillRepo.getAll()

  res.json(skills)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID.' })
  }

  const skill = await SkillRepo.getOne(id)

  if (skill == null) return res.status(404).json({ error: 'Skill not found.' })

  res.json(skill)
})

router.post('/', async (req, res) => {
  const { name } = req.body
  const createdSkill = await SkillRepo.create(name)

  res.status(201).json(createdSkill)
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { name } = req.body

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID.' })
  }

  const existingSkill = await SkillRepo.getOne(id)

  if (existingSkill == null) return res.status(404).json({ error: 'Skill not found.' })

  existingSkill.name = name

  const updatedSkill = await SkillRepo.update(existingSkill)

  res.json(updatedSkill)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID.' })
  }

  const existingSkill = await SkillRepo.getOne(id)

  if (existingSkill == null) return res.status(404).json({ error: 'Skill not found.' })

  const deletedSkill = await SkillRepo.remove(id)

  res.status(204).json(deletedSkill)
})

export default router
