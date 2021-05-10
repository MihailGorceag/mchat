const jwt = require('jsonwebtoken')

const {SECRET} = require('../constants')

const checkAuth = async (req, res, next) => {
  if (!req.cookies.jwt) {
    res.status(401).send()
    return
  }
  console.log('before verify')
  const {userId} = await jwt.verify(req.cookies.jwt, SECRET)
  if (!userId) {
    res.status(401).send()
    return
  }
  if (!req.cookies.jwtfe) {
    res.cookie('jwtfe', 'jwtfe', {
      httpOnly: false,
      maxAge: 1800000,
    })
  }

  req.userId = userId
  next()
}

module.exports = checkAuth
