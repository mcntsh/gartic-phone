import dotenv from 'dotenv'
import Sequelize from 'sequelize'

let database

function initializeDatabase() {
  if (database) {
    return
  }

  dotenv.config()
  database = new Sequelize({
    dialect: process.env.DB_DIALECT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    storage: process.env.DB_STORAGE,
  })
}

initializeDatabase()

export default database
