export const addNewGame = {
  method: 'POST',
  uri: '/api/game',
}

export const startGame = {
  method: 'POST',
  uri: ({ uuid }) => `/api/game/${uuid}/start`,
}

export const joinGame = {
  method: 'POST',
  uri: ({ uuid }) => `/api/game/${uuid}/join`,
}

export const getGame = {
  method: 'GET',
  uri: ({ uuid }) => `/api/game/${uuid}`,
}
