import express from 'express'
import tribes from './TribeRouter'
import temples from './TempleRouter'
import skills from './SkillRouter'
import cards from './CardRouter'

const router = express.Router()

router.use('/tribes', tribes)
router.use('/temples', temples)
router.use('/skills', skills)
router.use('/cards', cards)

export default router
