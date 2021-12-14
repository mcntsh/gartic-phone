import Game from '../domains/game/model'
import respondJson from '../helpers/respondJson'

export async function gameAttach(req, res, next) {
  const { uuid } = req.params

  let game
  try {
    game = await Game.findByUUID(uuid)
  } catch (e) {
    game = null
  }

  req.game = game
  req.reduxState.game = { data: game?.get({ plain: true }) }

  next()
}

export function gameRequired(req, res, next) {
  if (req.game) {
    return next()
  }

  respondJson(
    {
      code: 404,
      alerts: [
        {
          intent: 'danger',
          message: 'A matching game could not be found.',
        },
      ],
    },
    res
  )
}

export async function gameJoined(req, res, next) {
  const isJoined = await req.game.hasGuest(req.guest)
  if (isJoined) {
    return next()
  }

  respondJson(
    {
      code: 403,
      alerts: [
        {
          intent: 'danger',
          message: 'You are not a part of this game.',
        },
      ],
    },
    res
  )
}

export async function gameCreated(req, res, next) {
  const isCreator = await req.guest.hasGame(req.game)
  if (isCreator) {
    return next()
  }

  respondJson(
    {
      code: 403,
      alerts: [
        {
          intent: 'danger',
          message: 'You are not the creator of this game.',
        },
      ],
    },
    res
  )
}

export async function gameNotJoined(req, res, next) {
  const isJoined = await req.game.hasGuest(req.guest)
  if (!isJoined) {
    return next()
  }

  respondJson(
    {
      code: 403,
      alerts: [
        {
          intent: 'danger',
          message: 'You are already a part of this game.',
        },
      ],
    },
    res
  )
}

export function gameNotStarted(req, res, next) {
  if (!req.game.started) {
    return next()
  }

  respondJson(
    {
      code: 403,
      alerts: [
        {
          intent: 'danger',
          message: 'The game has already started.',
        },
      ],
    },
    res
  )
}

export async function gameStarted(req, res, next) {
  if (req.game.started) {
    return next()
  }

  respondJson(
    {
      code: 403,
      alerts: [
        {
          intent: 'danger',
          message: 'The game has not started yet.',
        },
      ],
    },
    res
  )
}

export async function gameJoinedIfStarted(req, res, next) {
  if (!req.game.started) {
    return next()
  }

  const isJoined = await req.game.hasGuest(req.guest)
  if (isJoined) {
    return next()
  }

  respondJson(
    {
      code: 403,
      alerts: [
        {
          intent: 'danger',
          message: 'The game has already started.',
        },
      ],
    },
    res
  )
}
