require('./config/config')
require('./db/mongoose')

const express = require('express')
const _ = require('lodash')
const bodyParser = require('body-parser')
const { celebrate, errors } = require('celebrate')

let { Player } = require('./models/player')
let { User } = require('./models/user')
let { authenticate } = require('./middleware/authenticate')
const { celebratePlayerSchema } = require('./celebrateSchemas/celebratePlayersSchema')

var app = express()

const port = process.env.PORT

app.use(bodyParser.json())

const parsePosition = (positionQuery) => {
  let $or = []
  const positionArray = positionQuery.toUpperCase().split('|')
  positionArray.forEach(pos => {
    $or.push({ position: pos })
  })

  return $or
}

function computePlayerSearchCriteria (query) {
  let tituAndSubs = {}
  let tituAndSubsLast10games = {}
  let cote = {}
  let goals = {}
  let position = {}
  let $or = {}

  if (query.min_tituAndSubs) {
    tituAndSubs.$gte = query.min_tituAndSubs
  }

  if (query.min_tituAndSubsLast10games) {
    tituAndSubsLast10games.$gte = query.min_tituAndSubsLast10games
  }
  if (query.max_cote) {
    cote.$lte = query.max_cote
  }

  if (query.min_goals) {
    goals.$gte = query.min_goals
  }

  if (query.position) {
    if (query.position.length === 1) {
      position = query.position
    } else {
      $or = parsePosition(query.position)
    }
  }

  let searchCriterias = {
    tituAndSubs,
    tituAndSubsLast10games,
    cote,
    goals,
    position,
    $or
  }

  // Delete all empty attributes from searchCriterias (needed for mongoose query)
  Object.keys(searchCriterias).forEach(key => _.isEmpty(searchCriterias[key]) && delete searchCriterias[key])

  return searchCriterias
}

app.get('/players', celebrate(celebratePlayerSchema), authenticate, (req, res) => {
  let searchCriterias

  try {
    searchCriterias = computePlayerSearchCriteria(req.query)
  } catch (e) {
    console.log(e)
    return res.status(500).send(e)
  }

  Player.find(searchCriterias, '-__v').then((players) => {
    console.log(`number of players corresponding to the criterias : ${players.length}`)
    res.send({ players })
  }, (e) => {
    res.status(400).send(e)
  })
})

// POST /users
app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password'])

  let user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password'])

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user)
    })
  }).catch((e) => {
    res.status(400).send()
  })
})

// route for logging out
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(400).send()
  })
})

app.listen(port, () => {
  console.log(`Started up at port ${port}`)
})

app.use(errors())

module.exports = { app }
