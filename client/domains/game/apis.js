export const addNewGame = {
  method: 'POST',
  uri: '/api/game',
}

export const getGame = {
  method: 'GET',
  uri: ({ uuid }) => `/api/game/${uuid}`,
}
