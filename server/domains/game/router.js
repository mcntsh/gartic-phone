import { Router } from 'express'
import Game from './model'
import respondJson from '../../helpers/respondJson'
import { corsOpen } from '../../middleware/cors'
import { guestAttach, guestRequired } from '../../middleware/guest'
import {
  gameAttach,
  gameRequired,
  gameNotStarted,
  gameNotJoined,
  gameJoined,
  gameJoinedIfStarted,
  gameCreated,
  gameStarted,
} from '../../middleware/game'

const router = Router()

router.options('*', corsOpen)

router.all('*', guestAttach)
router.all('/:uuid*', gameAttach)

router.get('/', corsOpen, (req, res) => {
  respondJson(
    {
      code: 404,
    },
    res
  )
})

router.get(
  '/:uuid',
  corsOpen,
  guestRequired,
  gameRequired,
  gameJoinedIfStarted,
  async (req, res) => {
    if (req.game) {
      return respondJson(
        {
          code: 200,
          body: req.game,
        },
        res
      )
    }
    respondJson(
      {
        code: 404,
        alerts: [
          {
            intent: 'danger',
            message: 'Game not found.',
          },
        ],
      },
      res
    )
  }
)

router.post('/', corsOpen, guestRequired, async (req, res) => {
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

router.post(
  '/:uuid/join',
  corsOpen,
  guestRequired,
  gameRequired,
  gameNotJoined,
  gameNotStarted,
  async (req, res) => {
    try {
      await req.game.addGuest(req.guest)
      respondJson({ code: 200 }, res)
    } catch (e) {
      respondJson(
        {
          code: 400,
          alerts: [
            {
              intent: 'danger',
              message: 'Something went wrong joining the game.',
            },
          ],
        },
        res
      )
    }
  }
)

router.post(
  '/:uuid/start',
  corsOpen,
  guestRequired,
  gameRequired,
  gameNotStarted,
  gameJoined,
  gameCreated,
  async (req, res) => {
    try {
      await req.game.start()
      respondJson({ code: 200 }, res)
    } catch (e) {
      respondJson(
        {
          code: 400,
          alerts: [
            {
              intent: 'danger',
              message: 'Something went wrong starting the game.',
            },
          ],
        },
        res
      )
    }
  }
)

router.get(
  '/:uuid/round',
  corsOpen,
  guestRequired,
  gameRequired,
  gameJoined,
  gameStarted,
  async (req, res) => {
    try {
      const gameRound = await req.game.getLatestRoundForGuest(req.guest)
      respondJson({ code: 200, body: gameRound }, res)
    } catch (e) {
      console.log(e)
      respondJson(
        {
          code: 404,
          alerts: [
            {
              intent: 'danger',
              message: 'Could not find a round for this game.',
            },
          ],
        },
        res
      )
    }
  }
)

export default router
