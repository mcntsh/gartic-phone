import Guest from '../domains/guest/model'
import respondJson from '../helpers/respondJson'

async function guest(req, res, next) {
  try {
    const { guest_uuid, guest_token } = req.cookies
    const guest = await Guest.findByAuth({
      uuid: guest_uuid,
      token: guest_token,
    })

    req.guest = guest

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

export default guest
