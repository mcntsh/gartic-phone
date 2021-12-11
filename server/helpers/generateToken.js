import crypto from 'crypto'

function generateToken() {
  return crypto.randomBytes(12).toString('hex')
}

export default generateToken
