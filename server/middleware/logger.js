const logger = (req, res, next) => {
  console.log(`Resource requested: ${req.method} ${req.originalUrl}`)
  next()
}

export default logger
