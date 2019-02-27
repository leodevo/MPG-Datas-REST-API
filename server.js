require('./config/config')
require('./db/mongoose')

const express = require('express')
const _ = require('lodash')
const bodyParser = require('body-parser')
const { celebrate, errors } = require('celebrate')

let { Player } = require('./models/player')
let { User } = require('./models/user')
const { celebratePlayerSchema } = require('./celebrateSchemas/celebratePlayersSchema')

var app = express()

const port = process.env.PORT

app.use(bodyParser.json())

function computePlayerSearchCriteria (query) {
  let tituAndSubs = {}
  let tituAndSubsLast10games = {}
  let cote = {}
  let goals = {}

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

  let searchCriterias = {
    tituAndSubs,
    tituAndSubsLast10games,
    cote,
    goals
  }

  // Delete all empty attributes from searchCriterias (needed for mongoose query)
  Object.keys(searchCriterias).forEach(key => _.isEmpty(searchCriterias[key]) && delete searchCriterias[key])

  return searchCriterias
}

app.get('/players', celebrate(celebratePlayerSchema), (req, res) => {
  let searchCriterias

  try {
    searchCriterias = computePlayerSearchCriteria(req.query)
  } catch (e) {
    res.status(500).send(e.message)
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

app.listen(port, () => {
  console.log(`Started up at port ${port}`)
})

app.use(errors())

module.exports = { app }
