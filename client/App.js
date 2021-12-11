import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import appReducer from './domains/app/reducer'
import guestReducer from './domains/guest/reducer'
import gameReducer from './domains/game/reducer'

TimeAgo.addDefaultLocale(en)

function App(props) {
  const rootReducer = combineReducers({
    app: appReducer,
    guest: guestReducer,
    game: gameReducer,
  })

  const store = createStore(rootReducer, props.preloadedState)

  if (typeof window !== 'undefined') {
    window.store = store
  }

  return <Provider store={store}>{props.children}</Provider>
}

export default App
