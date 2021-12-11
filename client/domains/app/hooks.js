import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

export function useRedirect() {
  const navigate = useNavigate()
  const location = useLocation()

  const getRedirectUri = React.useCallback(() => {
    const params = new URLSearchParams(location.search)
    return params.get('redirect')
  }, [location.search])

  const redirectUri = getRedirectUri()

  const getPathWithRedirect = React.useCallback((path) => {
    const params = new URLSearchParams({ redirect: location.pathname })
    return `${path}?${params.toString()}`
  })

  const redirect = () => {
    if (redirectUri) {
      navigate({ pathname: redirectUri })
    }
  }

  return { getPathWithRedirect, redirect }
}

export function useAlert() {
  const dispatch = useDispatch()

  const sendAlert = React.useCallback(
    ({ intent, message, isTemporary = true, duration = 3 } = {}) => {
      if (!intent || !message) return

      const alertId = new Date().getTime()

      dispatch({
        type: 'ADD_APP_ALERT',
        payload: {
          id: alertId,
          intent,
          message,
        },
      })

      if (isTemporary) {
        setTimeout(() => {
          dispatch({ type: 'REMOVE_APP_ALERT', payload: alertId })
        }, duration * 1000)
      }

      return alertId
    },
    [dispatch]
  )

  const clearAlert = React.useCallback((alertId) => {
    dispatch({ type: 'REMOVE_APP_ALERT', payload: alertId })
  })

  return { sendAlert, clearAlert }
}

const makeFetchRequest = async (uri, options) => {
  const resp = await fetch(uri, options)

  const data = await resp.json()
  if (!resp.ok) {
    return Promise.reject(data)
  }

  return Promise.resolve(data)
}

export function useRequest({ method, uri, headers }) {
  const apiUrl = useSelector((state) => state.app.apiUrl)

  const [state, setState] = React.useState({
    isLoading: false,
    isLoaded: false,
    isSuccessful: false,
    isFailed: false,
    fields: {},
    errors: {},
  })

  const makeRequest = React.useCallback(
    async ({ params, ...data } = {}) => {
      setState({
        isLoading: true,
        isLoaded: false,
        isSuccessful: false,
        isFailed: false,
        fields: {},
        errors: {},
      })

      const resolvedUri = typeof uri === 'function' ? uri(params || {}) : uri

      try {
        const resp = await makeFetchRequest(apiUrl + resolvedUri, {
          method,
          body: method !== 'GET' ? JSON.stringify(data) : undefined,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
        })

        setState((state) => ({
          ...state,
          isLoading: false,
          isLoaded: true,
          isSuccessful: true,
          isFailed: false,
          fields: resp.body,
        }))
      } catch (err) {
        setState((state) => ({
          ...state,
          isLoading: false,
          isLoaded: true,
          isSuccessful: false,
          isFailed: true,
          errors: err,
        }))
      }
    },
    [headers, method, uri]
  )

  return {
    ...state,
    makeRequest,
  }
}
