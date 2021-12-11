import fs from 'fs'
import { Router } from 'express'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import Game from '../game/model'
import ClientRouter from '../../../client/router'
import ClientApp from '../../../client/App'
import { guestOptional } from '../../middleware/guest'
import addReduxAlert from '../../helpers/addReduxAlert'

const router = Router()

router.get('/game/:uuid', async (req, res, next) => {
  try {
    const { uuid } = req.params
    const game = await Game.findByUUID(uuid)
    req.reduxState.game = game.get({ plain: true })
  } catch (e) {
    addReduxAlert({ intent: 'danger', message: 'Could not find game!' }, req)
  }

  next()
})

router.get('/*', guestOptional, async (req, res, next) => {
  if (req.skipClientRouter) return next()

  const preloadedState = req.reduxState
  const context = {}

  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <ClientApp preloadedState={preloadedState}>
        <ClientRouter context={context} />
      </ClientApp>
    </StaticRouter>
  )

  if (context.redirect) {
    return res.redirect(302, context.redirect)
  }

  const indexFile = path.resolve('./build/index.html')
  fs.readFile(indexFile, 'utf8', (err, data) => {
    // Put in the React template
    data = data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    data = data.replace(
      'window.__PRELOADED_STATE__ = {};',
      `
       window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
         /</g,
         '\\u003c'
       )}
       `
    )
    return res.send(data)
  })
})

export default router
