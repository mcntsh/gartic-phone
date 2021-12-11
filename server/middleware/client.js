export function skipClientRouter(req, res, next) {
  req.skipClientRouter = true
  next()
}
