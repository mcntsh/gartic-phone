import fs from 'fs'
import { Router } from 'express'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import Guest from '../guest/model'
import ClientRouter from '../../../client/router'
import ClientApp from '../../../client/App'

const router = Router()

router.get('/*', async (req, res, next) => {
  if (req.skipClientRouter) return next()

  const { guest_uuid } = req.cookies

  let guest
  try {
    guest = await Guest.findByUUID(guest_uuid)
    guest = guest.get({ raw: true })
  } catch {
    guest = null
  }

  const preloadedState = {
    app: { apiUrl: 'http://localhost:3000' },
    guest: { user: guest },
  }

  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <ClientApp preloadedState={preloadedState}>
        <ClientRouter />
      </ClientApp>
    </StaticRouter>
  )

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
