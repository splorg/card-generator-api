import express from 'express'
import CardRepo from '../database/repository/CardRepo'
import SkillRepo from '../database/repository/SkillRepo'
import TempleRepo from '../database/repository/TempleRepo'
import TribeRepo from '../database/repository/TribeRepo'
import cardFilterExtractor from '../utils/cardFilterExtractor'
import { Types } from 'mongoose'

const router = express.Router()

router.get('/', async (req, res) => {
  const filters = cardFilterExtractor(req.query)

  if (Object.keys(filters).length === 0) {
    const cards = await CardRepo.getAll()

    return res.json(cards)
  }

  const cards = await CardRepo.getFiltered(filters)

  res.json(cards)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID.' })
  }

  const card = await CardRepo.getOne(id)

  if (card == null) return res.status(404).json({ error: 'Card not found.' })

  res.json(card)
})

router.post('/', async (req, res) => {
  const { name, rarity, healthPoints, powerPoints, skills, tribe, temple } = req.body

  if (!Types.ObjectId.isValid(tribe) || !Types.ObjectId.isValid(temple)) {
    return res.status(400).json({ error: 'Invalid temple or tribe.' })
  }

  const existingTribe = await TribeRepo.getOne(tribe)
  const existingTemple = await TempleRepo.getOne(temple)

  if ((existingTemple == null) || (existingTribe == null)) {
    return res.status(400).json({ error: 'Invalid temple or tribe.' })
  }

  const existingSkills = await SkillRepo.findSkillsByName(skills)

  if ((existingSkills == null) || existingSkills.length !== skills.length) {
    return res.status(400).json({ error: 'Invalid skill ID(s).' })
  }

  const card = await CardRepo.create({
    name,
    rarity,
    healthPoints,
    powerPoints,
    skills: existingSkills.map(skill => skill.id),
    temple,
    tribe
  })

  res.status(201).json(card)
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { name, rarity, healthPoints, powerPoints, skills, temple, tribe } = req.body

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID.' })
  }

  const existingCard = await CardRepo.getOne(id)

  if (existingCard == null) return res.status(404).json({ error: 'Card not found.' })

  const tribeObj = await TribeRepo.getOne(tribe)
  const templeObj = await TempleRepo.getOne(temple)

  if ((tribeObj == null) || (templeObj == null)) return res.status(400).json({ error: 'Invalid tribe or temple ID.' })

  existingCard.name = name ?? existingCard.name
  existingCard.rarity = rarity ?? existingCard.rarity
  existingCard.healthPoints = healthPoints ?? existingCard.healthPoints
  existingCard.powerPoints = powerPoints ?? existingCard.powerPoints
  existingCard.temple = temple ?? existingCard.temple
  existingCard.tribe = tribe ?? existingCard.tribe

  if (skills !== undefined && skills !== null) {
    const existingSkills = await SkillRepo.findSkillsByName(skills)

    if ((existingSkills == null) || existingSkills.length !== skills.length) return res.status(400).json({ error: 'Invalid skill ID(s).' })

    existingCard.skills = existingSkills
  }

  const updatedCard = await CardRepo.update(existingCard)

  res.json(updatedCard)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID.' })
  }

  const deletedCard = await CardRepo.deleteCard(id)

  if (deletedCard == null) res.status(404).json({ error: 'Card not found.' })

  res.json(deletedCard)
})

export default router
