import dotenv from 'dotenv'
import modules from './domains/**/*.js'
import database from './database'

function initialize(app) {
  dotenv.config()

  modules.forEach((module) => {
    if (typeof module.init === 'function') {
      module.init(database)
    }
  })

  const WEB_SERVER_PORT = process.env.WEB_SERVER_PORT || 3000
  app.listen(WEB_SERVER_PORT)

  console.log(`Server started on port ${WEB_SERVER_PORT}`)
}

export { database }
export default initialize
