import { check } from 'express-validator'

export const newGuest = [
  check('name')
    .isLength({ min: 3, max: 50 })
    .withMessage('Must be between 3 and 50 characters.'),
]
