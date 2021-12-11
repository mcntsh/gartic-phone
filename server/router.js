import { Router } from 'express'
import { skipClientRouter } from './middleware/client'
import client from './domains/client/router'
import guest from './domains/guest/router'
import game from './domains/game/router'

const router = Router()

router.use('/api/*', skipClientRouter)
router.use('/api/guest', guest)
router.use('/api/game', game)

router.use('/', client)

export default router
