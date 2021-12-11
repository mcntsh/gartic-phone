const initialState = null

function game(state = initialState, action) {
  switch (action.type) {
    case 'SET_GAME':
      return {
        ...action.payload,
      }
    default:
      return state
  }
}

export default game
