require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const { celebrate, errors } = require('celebrate')

var { mongoose } = require('./db/mongoose')
let { Player } = require('./models/player')
const { celebratePlayerSchema } = require('./celebrateSchemas/celebratePlayersSchema')

var app = express()

const port = process.env.PORT
console.log(`process.env.PORT : ${process.env.PORT}`)

app.use(bodyParser.json())

function computePlayerSearchCriteria (query) {
  let searchCriterias = {}

  if (query.min_tituAndSubs) {
    searchCriterias.tituAndSubs = { $gte: query.min_tituAndSubs }
  }

  if (query.min_tituAndSubsLast10games) {
    searchCriterias.tituAndSubsLast10games = { $gte: query.min_tituAndSubsLast10games }
  }

  if (query.max_cote) {
    searchCriterias.cote = { $lte: query.max_cote }
  }

  return searchCriterias
}

app.get('/players', celebrate(celebratePlayerSchema), (req, res) => {
  /*
  let tituAndSubsMin = req.query.tituAndSubsMin
  let tituAndSubsMinLast10games = req.query.tituAndSubsMinLast10games
  let coteMax = req.query.coteMax

  console.log(`tituAndSubsMin : ${tituAndSubsMin}`)
  console.log(`tituAndSubsMinLast10games : ${tituAndSubsMinLast10games}`)
  console.log(`coteMax : ${coteMax}`)
  */

  let searchCriterias = computePlayerSearchCriteria(req.query)

  Player.find(searchCriterias, '-__v').then((players) => {
    console.log(`number of players corresponding to the criterias : ${players.length}`)
    res.send({ players })
  }, (e) => {
    res.status(400).send(e)
  })
})

app.listen(port, () => {
  console.log(`Started up at port ${port}`)
})

app.use(errors())

module.exports = { app }
