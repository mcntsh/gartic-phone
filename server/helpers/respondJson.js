import { Model } from 'sequelize'

async function respondJson(
  { code = 404, alerts = [], validations = {}, body = {} },
  response
) {
  response.status(code)

  if (body instanceof Model) {
    body = body.get({ plain: true })
  }

  response.body = {
    alerts: [...(response?.body?.alerts ?? []), ...alerts],
    validations: { ...(response?.body?.validations ?? {}), ...validations },
    body: { ...(response?.body?.body ?? {}), ...body },
  }

  response.json(response.body)
}

export default respondJson
