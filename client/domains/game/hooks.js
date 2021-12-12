import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNewGame, getGame } from './apis'
import { useRequest, useAlert } from '../app/hooks'

export function useGetGame() {
  const dispatch = useDispatch()
  const { sendAlert } = useAlert()
  const game = useSelector((state) => state.game.data)

  const { fields, errors, isLoading, isSuccessful, isFailed, makeRequest } =
    useRequest(getGame)

  React.useEffect(() => {
    if (isSuccessful) {
      dispatch({
        type: 'SET_GAME',
        payload: {
          ...fields,
        },
      })
    }
    if (isFailed) {
      errors.alerts.map(sendAlert)
    }
  }, [isSuccessful, isFailed])

  return {
    game,
    getGame: makeRequest,
    isLoading,
    errors,
  }
}

export function useNewGame() {
  const dispatch = useDispatch()
  const { sendAlert } = useAlert()

  const { fields, errors, isLoading, isSuccessful, isFailed, makeRequest } =
    useRequest(addNewGame)

  React.useEffect(() => {
    if (isSuccessful) {
      sendAlert({
        intent: 'success',
        message: 'Game created!',
      })
    }
    if (isFailed) {
      errors.alerts.map(sendAlert)
    }
  }, [fields, isSuccessful, isFailed, dispatch])

  return {
    game: Object.keys(fields).length ? fields : null,
    addNewGame: makeRequest,
    isLoading,
    errors,
  }
}
