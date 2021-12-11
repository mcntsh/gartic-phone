import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import App from './App'

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

ReactDOM.render(
  <BrowserRouter>
    <App preloadedState={preloadedState}>
      <Router />
    </App>
  </BrowserRouter>,
  document.getElementById('root')
)
