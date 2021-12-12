const initialState = {
  data: null,
}

function game(state = initialState, action) {
  switch (action.type) {
    case 'SET_GAME':
      return {
        data: action.payload,
      }
    default:
      return state
  }
}

export default game
