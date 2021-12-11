function setCookie({ name, value }, res) {
  res.cookie(name, value, { maxAge: 900000, httpOnly: true })
}

export default setCookie
