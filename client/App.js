import React from 'react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import appReducer from './domains/app/reducer'
import guestReducer from './domains/guest/reducer'

function App(props) {
  const rootReducer = combineReducers({
    app: appReducer,
    guest: guestReducer,
  })

  const store = createStore(rootReducer, props.preloadedState)
  return <Provider store={store}>{props.children}</Provider>
}

export default App
