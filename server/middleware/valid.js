import { validationResult } from 'express-validator'
import respondJson from '../helpers/respondJson'
export default (validators) => {
  return [
    ...validators,
    (req, res, next) => {
      const { errors } = validationResult(req)
      if (errors.length) {
        respondJson(
          {
            code: 400,
            validations: errors.reduce((acc, value) => {
              return {
                ...acc,
                [value.param]: value.msg,
              }
            }, {}),
          },
          res
        )
      }
      next()
    },
  ]
}
