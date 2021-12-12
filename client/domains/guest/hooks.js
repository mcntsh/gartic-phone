import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentGuest, addNewGuest } from './apis'
import { useRequest, useAlert } from '../app/hooks'

export function useGetGuest({ showAlert = true } = {}) {
  const dispatch = useDispatch()
  const guest = useSelector((state) => state.guest.user)
  const { sendAlert } = useAlert()

  const { fields, errors, isLoading, isSuccessful, isFailed, makeRequest } =
    useRequest(getCurrentGuest)

  React.useEffect(() => {
    if (isSuccessful) {
      dispatch({
        type: 'SET_GUEST_USER',
        payload: {
          ...fields,
        },
      })
    }
    if (isFailed && showAlert) {
      errors.alerts.map(sendAlert)
    }
  }, [fields, isSuccessful, isFailed])

  return {
    guest,
    getGuest: makeRequest,
    isLoading,
    errors,
  }
}

export function useNewGuest() {
  const dispatch = useDispatch()
  const guest = useSelector((state) => state.guest.user)
  const { sendAlert } = useAlert()

  const { fields, errors, isLoading, isSuccessful, isFailed, makeRequest } =
    useRequest(addNewGuest)

  React.useEffect(() => {
    if (isSuccessful) {
      sendAlert({
        intent: 'success',
        message: 'Welcome aboard!',
      })

      dispatch({
        type: 'SET_GUEST_USER',
        payload: {
          ...fields,
        },
      })
    }
    if (isFailed) {
      errors.alerts.map(sendAlert)
    }
  }, [fields.name, isSuccessful, isFailed, dispatch])

  return {
    guest,
    addNewGuest: makeRequest,
    isLoading,
    errors,
  }
}
