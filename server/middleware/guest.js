import Guest from '../domains/guest/model'
import respondJson from '../helpers/respondJson'

export async function guestAttach(req, res, next) {
  const { guest_uuid, guest_token } = req.cookies

  let guest
  try {
    guest = await Guest.findByAuth({
      uuid: guest_uuid,
      token: guest_token,
    })
  } catch {
    guest = null
  }

  req.guest = guest
  req.reduxState.guest = { user: guest?.get({ plain: true }) }

  next()
}

export function guestRequired(req, res, next) {
  if (req.guest) {
    return next()
  }

  respondJson(
    {
      code: 403,
      alerts: [
        {
          intent: 'danger',
          message: 'Invalid or expired login session.',
        },
      ],
    },
    res
  )
}
