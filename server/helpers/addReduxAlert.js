function addReduxAlert(alert, req) {
  const id = new Date().getTime()

  req.reduxState = {
    ...req.reduxState,
    app: {
      ...(req.reduxState.app || {}),
      alerts: {
        ...(req.reduxState.alerts || {}),
        [id]: { ...alert },
      },
    },
  }
}

export default addReduxAlert
