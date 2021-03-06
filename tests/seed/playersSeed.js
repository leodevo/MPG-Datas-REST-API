const { Player } = require('../../models/player')
const {
  playerOne,
  playerTwo,
  playerThree,
  playerFour,
  playerFive,
  playerSix,
  playerSeven,
  playerEight,
  playerNine,
  playerTen
} = require('./datas/playersDatasSeed')

const players = [
  playerOne,
  playerTwo,
  playerThree,
  playerFour,
  playerFive,
  playerSix,
  playerSeven,
  playerEight,
  playerNine,
  playerTen
]

// tituAndSubsMin: 14,
// tituAndSubsMinLast10games: 8,
// coteMax: 20
const playersMatchingSpecificGetRequestOne = [
  playerTwo,
  playerFour,
  playerFive,
  playerSeven,
  playerEight
]

// tituAndSubsMin: 14,
// tituAndSubsMinLast10games: 8,
const playersMatchingSpecificGetRequestTwo = [
  playerTwo,
  playerFour,
  playerFive,
  playerSeven,
  playerEight,
  playerTen
]

const playersMatchingSpecificGetRequestThree = [
  playerOne,
  playerTwo,
  playerSeven,
  playerTen
]

const playersMatchingSpecificGetRequestFour = [
  playerThree,
  playerSix,
  playerEight
]

const playersMatchingSpecificGetRequestFive = [
  playerTwo,
  playerThree,
  playerSix,
  playerEight
]

const populatePlayers = (done) => {
  Player.deleteMany({}).then(() => {
    return Player.insertMany(players)
  }).then(() => done())
}

module.exports = {
  players,
  populatePlayers,
  playersMatchingSpecificGetRequestOne,
  playersMatchingSpecificGetRequestTwo,
  playersMatchingSpecificGetRequestThree,
  playersMatchingSpecificGetRequestFour,
  playersMatchingSpecificGetRequestFive
}
