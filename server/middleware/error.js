import respondJson from '../helpers/respondJson'

const error = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  respondJson(
    {
      code: 500,
      alerts: [{ intent: 'danger', message: err.message }],
    },
    res
  )
}

export default error
