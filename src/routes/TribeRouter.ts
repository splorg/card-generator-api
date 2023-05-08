import express from 'express'
import TribeRepo from '../database/repository/TribeRepo'
import { Types } from 'mongoose'

const router = express.Router()

router.get('/', async (req, res) => {
  const tribes = await TribeRepo.getAll()

  res.json(tribes)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID.' })
  }

  const tribe = await TribeRepo.getOne(id)

  if (tribe == null) return res.status(404).json({ error: 'Tribe not found.' })

  res.json(tribe)
})

router.post('/', async (req, res) => {
  const { name } = req.body
  const createdTribe = await TribeRepo.create(name)

  res.status(201).json(createdTribe)
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { name } = req.body

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID.' })
  }

  const existingTribe = await TribeRepo.getOne(id)

  if (existingTribe == null) return res.status(404).json({ error: 'Tribe not found.' })

  existingTribe.name = name

  const updatedTribe = await TribeRepo.update(existingTribe)

  res.json(updatedTribe)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID.' })
  }

  const existingTribe = await TribeRepo.getOne(id)

  if (existingTribe == null) return res.status(404).json({ error: 'Tribe not found.' })

  const deletedTribe = await TribeRepo.remove(id)

  res.status(204).json(deletedTribe)
})

export default router
