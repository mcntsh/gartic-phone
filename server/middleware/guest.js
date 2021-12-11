import Guest from '../domains/guest/model'
import respondJson from '../helpers/respondJson'

async function fetchGuest(req) {
  const { guest_uuid, guest_token } = req.cookies
  const guest = await Guest.findByAuth({
    uuid: guest_uuid,
    token: guest_token,
  })

  req.guest = guest
  req.reduxState.guest = { user: guest.get({ raw: true }) }
}

export async function guestRequired(req, res, next) {
  try {
    await fetchGuest(req)
    next()
  } catch (e) {
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
}

export async function guestOptional(req, res, next) {
  try {
    await fetchGuest(req)
  } catch {
    console.log('Without guest record')
  }

  next()
}
