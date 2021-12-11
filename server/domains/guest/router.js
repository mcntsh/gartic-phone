import { Router } from 'express'
import Guest from './model'
import { newGuest as newGuestValidator } from './validators'
import setCookie from '../../helpers/setCookie'
import respondJson from '../../helpers/respondJson'
import generateToken from '../../helpers/generateToken'
import { corsOpen } from '../../middleware/cors'
import valid from '../../middleware/valid'
import guest from '../../middleware/guest'

const router = Router()

router.options('*', corsOpen)

router.get('/', corsOpen, guest, (req, res) => {
  respondJson(
    {
      code: 200,
      body: req.guest,
    },
    res
  )
})

router.post('/', corsOpen, valid(newGuestValidator), async (req, res) => {
  const { name } = req.body
  try {
    const guestToken = generateToken()
    const guest = await Guest.create({ name, token: guestToken })

    setCookie({ name: 'guest_uuid', value: guest.uuid }, res)
    setCookie({ name: 'guest_token', value: guestToken }, res)

    respondJson(
      {
        code: 200,
        body: guest,
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
            message: 'Something went wrong creating a guest.',
          },
        ],
      },
      res
    )
  }
})

export default router
