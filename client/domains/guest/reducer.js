const initialState = {
  user: null,
}

function guest(state = initialState, action) {
  switch (action.type) {
    case 'SET_GUEST_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'UNSET_GUEST_USER':
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

export default guest
