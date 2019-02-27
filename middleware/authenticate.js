const { User } = require('./../models/user')

const authenticate = (req, res, next) => {
  let token = req.header('x-auth')

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject(new Error('valid token, but no user found for that token'))
    }

    req.user = user
    req.token = token
    next()
  }).catch((e) => {
    res.status(401).send()
  })
}

module.exports = { authenticate }