import express from 'express'
import TempleRepo from '../database/repository/TempleRepo'
import { Types } from 'mongoose'

const router = express.Router()

router.get('/', async (req, res) => {
  const temples = await TempleRepo.getAll()

  res.json(temples)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID.' })
  }

  const temple = await TempleRepo.getOne(id)

  if (temple == null) return res.status(404).json({ error: 'Temple not found.' })

  res.json(temple)
})

router.post('/', async (req, res) => {
  const { name } = req.body
  const createdTemple = await TempleRepo.create(name)

  res.status(201).json(createdTemple)
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { name } = req.body

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID.' })
  }

  const existingTemple = await TempleRepo.getOne(id)

  if (existingTemple == null) return res.status(404).json({ error: 'Temple not found.' })

  existingTemple.name = name

  const updatedTemple = await TempleRepo.update(existingTemple)

  res.json(updatedTemple)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID.' })
  }

  const existingTemple = await TempleRepo.getOne(id)

  if (existingTemple == null) return res.status(404).json({ error: 'Temple not found.' })

  const deletedTemple = await TempleRepo.remove(id)

  res.status(204).json(deletedTemple)
})

export default router
