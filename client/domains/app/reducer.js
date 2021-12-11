const initialState = {
  apiUrl: '',
  redirect: null,
  alerts: {},
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_APP_ALERT':
      return {
        ...state,
        alerts: {
          ...state.alerts,
          [action.payload.id]: {
            intent: action.payload.intent,
            message: action.payload.message,
          },
        },
      }

    case 'REMOVE_APP_ALERT': {
      if (!state.alerts[action.payload]) return state
      const {
        [action.payload]: _, // eslint-disable-line no-unused-vars
        ...alerts
      } = state.alerts
      return { ...state, alerts }
    }

    case 'ADD_APP_REDIRECT':
      return {
        ...state,
        redirect: action.payload,
      }

    case 'REMOVE_APP_REDIRECT': {
      return {
        ...state,
        redirect: null,
      }
    }

    default:
      return state
  }
}

export default appReducer
