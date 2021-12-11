import respondJson from '../helpers/respondJson'

const error = (err, req, res) => {
  respondJson(
    {
      code: 500,
      alerts: [{ intent: 'danger', message: err.message }],
    },
    res
  )
}

export default error
