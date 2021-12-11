import dotenv from 'dotenv'

function redux(req, res, next) {
  dotenv.config()

  req.reduxState = {
    app: {
      apiUrl: process.env.FRONTEND_API_URL,
    },
  }

  next()
}

export default redux
