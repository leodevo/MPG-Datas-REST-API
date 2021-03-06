const { ObjectId } = require('mongodb')

const playerOneId = new ObjectId()
const playerTwoId = new ObjectId()
const playerThreeId = new ObjectId()
const playerFourId = new ObjectId()
const playerFiveId = new ObjectId()
const playerSixId = new ObjectId()
const playerSevenId = new ObjectId()
const playerEightId = new ObjectId()
const playerNineId = new ObjectId()
const playerTenId = new ObjectId()

const playerOne = {
  _id: playerOneId.toHexString(),
  cote: 9,
  titularisations: 5,
  substitutions: 14,
  tituAndSubs: 19,
  goals: 3,
  average: 5.23684210526316,
  grades: [
    5,
    5,
    7,
    4,
    5,
    5,
    6.5,
    null,
    null,
    5,
    5,
    5,
    5,
    null,
    5,
    null,
    null,
    4.5,
    5,
    5,
    5,
    5.5,
    null,
    5,
    7,
    null
  ],
  tituAndSubsLast10games: 7,
  averageLast10games: 5.28571428571429,
  team: 'OL',
  name: 'Terrier Martin',
  position: 'M'
}

const playerTwo = {
  _id: playerTwoId.toHexString(),
  cote: 19,
  titularisations: 20,
  substitutions: 3,
  tituAndSubs: 23,
  goals: 6,
  average: 5.15217391304348,
  grades: [
    6.5,
    4,
    7.5,
    4,
    4.5,
    8,
    5,
    6,
    3.5,
    5.5,
    4,
    4,
    null,
    5,
    6.5,
    3.5,
    6,
    5,
    5,
    6,
    4,
    null,
    5.5,
    4.5,
    5,
    null
  ],
  tituAndSubsLast10games: 8,
  averageLast10games: 5.125,
  team: 'OL',
  name: 'Traoré Bertrand',
  position: 'A'
}

const playerThree = {
  _id: playerThreeId.toHexString(),
  cote: 7,
  titularisations: 1,
  substitutions: 3,
  tituAndSubs: 4,
  goals: 0,
  average: 4.625,
  grades: [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    5,
    5,
    4,
    4.5,
    null
  ],
  tituAndSubsLast10games: 4,
  averageLast10games: 4.625,
  team: 'MHSC',
  name: 'Ristic Mihailo',
  position: 'D'
}

const playerFour = {
  _id: playerFourId.toHexString(),
  cote: 13,
  titularisations: 20,
  substitutions: 4,
  tituAndSubs: 24,
  goals: 2,
  average: 5.04166666666667,
  grades: [
    3.5,
    7,
    5,
    6,
    4,
    5,
    4.5,
    5,
    6.5,
    3,
    5,
    5,
    5.5,
    4.5,
    6,
    5,
    4.5,
    4.5,
    4.5,
    5.5,
    6.5,
    5.5,
    5,
    4.5,
    null,
    null
  ],
  tituAndSubsLast10games: 8,
  averageLast10games: 5.0625,
  team: 'TFC',
  name: 'Dossevi Mathieu',
  position: 'M'
}

const playerFive = {
  _id: playerFiveId.toHexString(),
  cote: 14,
  titularisations: 23,
  substitutions: 0,
  tituAndSubs: 23,
  goals: 0,
  average: 5.47826086956522,
  grades: [
    5,
    5.5,
    5,
    5.5,
    6,
    6,
    5.5,
    8,
    5,
    6,
    6,
    5,
    7,
    4.5,
    5,
    null,
    5,
    6,
    5.5,
    4.5,
    5,
    null,
    6,
    3,
    6,
    null
  ],
  tituAndSubsLast10games: 8,
  averageLast10games: 5.125,
  team: 'FCN',
  name: 'Tatarusanu Ciprian',
  position: 'G'
}

const playerSix =
{
  _id: playerSixId.toHexString(),
  cote: null,
  titularisations: 4,
  substitutions: 0,
  tituAndSubs: 4,
  goals: 0,
  average: 4.625,
  grades: [
    null,
    5,
    4.5,
    null,
    null,
    null,
    null,
    null,
    null,
    5,
    null,
    4,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ],
  tituAndSubsLast10games: 0,
  averageLast10games: null,
  team: 'ASM',
  name: 'Touré Almamy',
  position: 'D'
}

const playerSeven = {
  _id: playerSevenId.toHexString(),
  cote: 15,
  titularisations: 24,
  substitutions: 0,
  tituAndSubs: 24,
  goals: 3,
  average: 5.39583333333333,
  grades: [
    4.5,
    4.5,
    5.5,
    6,
    6.5,
    6,
    6,
    7,
    5,
    null,
    5.5,
    4.5,
    5,
    4.5,
    6,
    5.5,
    5.5,
    7.5,
    4.5,
    5,
    5,
    5,
    5,
    4.5,
    5.5,
    null
  ],
  tituAndSubsLast10games: 9,
  averageLast10games: 5.27777777777778,
  team: 'SMC',
  name: 'Fajr Faycal',
  position: 'M'
}

const playerEight = {
  _id: playerEightId.toHexString(),
  cote: 13,
  titularisations: 19,
  substitutions: 1,
  tituAndSubs: 20,
  goals: 2,
  average: 5.45,
  grades: [
    null,
    4.5,
    4,
    6,
    5.5,
    6,
    5,
    null,
    null,
    null,
    4,
    6,
    7,
    6,
    5,
    5.5,
    5.5,
    6,
    null,
    3.5,
    6,
    5.5,
    6,
    5.5,
    6.5,
    null
  ],
  tituAndSubsLast10games: 8,
  averageLast10games: 5.5625,
  team: 'SCO',
  name: 'Pavlovic Mateo',
  position: 'D'
}

const playerNine = {
  _id: playerNineId.toHexString(),
  cote: 9,
  titularisations: 5,
  substitutions: 10,
  tituAndSubs: 15,
  goals: 1,
  average: 4.83333333333333,
  grades: [
    4.5,
    4.5,
    4.5,
    null,
    6,
    5,
    4.5,
    5,
    null,
    null,
    6.5,
    4.5,
    4.5,
    3.5,
    5,
    5,
    null,
    5,
    4.5,
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ],
  tituAndSubsLast10games: 2,
  averageLast10games: 4.75,
  team: 'RCSA',
  name: 'Zohi Kévin',
  position: 'M'
}

const playerTen = {
  _id: playerTenId.toHexString(),
  cote: 1000,
  titularisations: 26,
  substitutions: null,
  tituAndSubs: 26,
  goals: 20,
  average: 10,
  grades: [
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10,
    10
  ],
  tituAndSubsLast10games: 10,
  averageLast10games: 10,
  team: 'ZZFC',
  name: 'Zizou',
  position: 'M'
}

module.exports = {
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
}
