function setCookie({ name, value, age = 14 }, res) {
  const cookieAge = age * 24 * 3600000 // age is in days
  res.cookie(name, value, { maxAge: cookieAge, httpOnly: true })
}

export default setCookie
