import { Router } from 'express'
import Game from './model'
import respondJson from '../../helpers/respondJson'
import { corsOpen } from '../../middleware/cors'
import guest from '../../middleware/guest'

const router = Router()

router.options('*', corsOpen)

router.get('/', corsOpen, guest, (req, res) => {
  respondJson(
    {
      code: 404,
    },
    res
  )
})

router.get('/:id', corsOpen, guest, async (req, res) => {
  const { id } = req.params
  try {
    const game = await Game.findByUUID(id)

    respondJson(
      {
        code: 200,
        body: game,
      },
      res
    )
  } catch (e) {
    respondJson(
      {
        code: 400,
        alerts: [
          {
            intent: 'danger',
            message: 'Something went wrong fetching the game.',
          },
        ],
      },
      res
    )
  }
})

router.post('/', corsOpen, guest, async (req, res) => {
  try {
    const game = await Game.create()
    await req.guest.addGame(game)
    await game.addGuest(req.guest)

    respondJson(
      {
        code: 200,
        body: game,
      },
      res
    )
  } catch (e) {
    respondJson(
      {
        code: 400,
        alerts: [
          {
            intent: 'danger',
            message: 'Something went wrong creating a new game.',
          },
        ],
      },
      res
    )
  }
})

export default router
