import React from 'react'
import { useDispatch } from 'react-redux'
import { addNewGame } from './apis'
import { useRequest, useAlert } from '../app/hooks'

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
      console.log(errors)
      errors.alerts.map(sendAlert)
    }
  }, [fields.name, isSuccessful, isFailed, dispatch])

  return {
    game: Object.keys(fields).length ? fields : null,
    addNewGame: makeRequest,
    isLoading,
    errors,
  }
}
