const expect = require('expect')
const request = require('supertest')

const { app } = require('./../server')

const {
  players,
  populatePlayers,
  playersMatchingSpecificGetRequestOne,
  playersMatchingSpecificGetRequestTwo,
  playersMatchingSpecificGetRequestThree
} = require('./seed/seed')

beforeEach(populatePlayers)

describe('GET /players', () => {
  it('should return All players', (done) => {
    request(app)
      .get('/players')
      .send()
      .expect(200)
      .expect((res) => {
        expect(res.body.players).toEqual(players) // all players are returned
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })

  it('should return only players matching query params - 1', (done) => {
    request(app)
      .get('/players')
      .query({
        min_tituAndSubs: 14,
        min_tituAndSubsLast10games: 8,
        max_cote: 20
      })
      .send()
      .expect(200)
      .expect((res) => {
        expect(res.body.players).toEqual(playersMatchingSpecificGetRequestOne)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })

  it('should return only players matching query params - 2', (done) => {
    request(app)
      .get('/players')
      .query({
        min_tituAndSubs: 14,
        min_tituAndSubsLast10games: 8
        // max_cote not provided
      })
      .send()
      .expect(200)
      .expect((res) => {
        expect(res.body.players).toEqual(playersMatchingSpecificGetRequestTwo)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })

  it('should return only players matching query params - 3', (done) => {
    request(app)
      .get('/players')
      .query({
        min_goals: 3
      })
      .send()
      .expect(200)
      .expect((res) => {
        expect(res.body.players).toEqual(playersMatchingSpecificGetRequestThree)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })

  it('should return 400 when params in query are invalid', (done) => {
    request(app)
      .get('/players')
      .query({
        min_tituAndSubs: 14,
        min_tituAndSubsLast10games: 8,
        max_cote: 'invalidValue' // should be an integer
      })
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })

  it('should return 400 when params in query are invalid - preventing NoSQL injection', (done) => {
    request(app)
      .get('/players')
      .query({
        min_tituAndSubs: 14,
        min_tituAndSubsLast10games: '$gte 8', // should be an integer
        max_cote: 20
      })
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        done()
      })
  })
})
