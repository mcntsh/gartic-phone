import express from 'express'
import requestIp from 'request-ip'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import logger from './middleware/logger'
import redux from './middleware/redux'
import uncaughtError from './middleware/error'
import domainRouter from './router'
import initialize, { database } from './initialize'

const app = express()

app.use(requestIp.mw())
app.use(express.static('build', { index: false }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger)
app.use(redux)
app.use('/', domainRouter)
app.use((req, res, next) => res.status(404) && next())
app.use(uncaughtError)

export { database }
export default app

initialize(app)
