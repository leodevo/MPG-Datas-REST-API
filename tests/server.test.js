const expect = require('expect')
const request = require('supertest')

const { app } = require('./../server')

const { User } = require('./../models/user')

const {
  players,
  populatePlayers,
  playersMatchingSpecificGetRequestOne,
  playersMatchingSpecificGetRequestTwo,
  playersMatchingSpecificGetRequestThree
} = require('./seed/playersSeed')

const {
  users,
  populateUsers
} = require('./seed/usersSeed')

beforeEach(populateUsers)
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

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString())
        expect(res.body.email).toBe(users[0].email)
      })
      .end(done)
  })

  it('should return 401 if  authentification fails', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({})
      })
      .end(done)
  })
})

describe('POST /users', () => {
  it('should create a user', (done) => {
    let email = 'example@random.com'
    let password = 'jrjrj2222!L'

    request(app)
      .post('/users')
      .send({ email, password })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy()
        expect(res.body._id).toBeTruthy()
        expect(res.body.email).toBe(email)
      })
      .end((err) => {
        if (err) {
          console.log(err.message)
          return done(err)
        }

        User.findOne({ email }).then((user) => {
          expect(user).toBeTruthy()
          expect(user.password).not.toBe(password) // password should be hashed and therefore be modified
          done()
        }).catch((e) => {
          done(e)
        })
      })
  })

  it('should return validation error if the request is invalid (invalid email)', (done) => {
    let aInvalidEmail = 'ImAWrongEmail'
    let aValidPassword = 'jrjrj2222!L'

    request(app)
      .post('/users')
      .send({ 
        email: aInvalidEmail,
        password: aValidPassword
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeFalsy()
      })
      .end((err) => {
        if (err) {
          console.log(err.message)
          return done(err)
        }

        User.findOne({ aInvalidEmail }).then((user) => {
          expect(user).toBeFalsy()
          done()
        }).catch((e) => {
          done(e)
        })
      })
  })

  it('should return validation error if the request is invalid (invalid password)', (done) => {
    let aValidEmail = 'ImAValidEmail@email.com'
    let aInvalidPassword = 'abc' // Password is too short

    request(app)
      .post('/users')
      .send({ 
        email: aValidEmail, 
        password: aInvalidPassword
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeFalsy()
      })
      .end((err) => {
        if (err) {
          console.log(err.message)
          return done(err)
        }

        User.findOne({ aValidEmail }).then((user) => {
          expect(user).toBeFalsy()
          done()
        }).catch((e) => {
          done(e)
        })
      })
  })

  it('should not create user if email is already in use', (done) => {
    let aValidPassword = 'jrjrj2222!L'

    request(app)
      .post('/users')
      .send({
        email: users[0].email,
        password: aValidPassword
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeFalsy()
      })
      .end((err) => {
        if (err) {
          console.log(err.message)
          return done(err)
        }

        User.find().then((usersReturned) => {
          expect(usersReturned.length).toBe(2) // verifying that no users have been inserted
          done()
        }).catch((e) => {
          done(e)
        })
      })
  })
})

describe('POST /users/login', () => {
  it('should login user and return auth token', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy()
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[1]).toMatchObject({
            access: 'auth',
            token: res.headers['x-auth']
          })
          done()
        }).catch((e) => {
          done(e)
        })
      })
  })

  it('should reject invalid login', (done) => {
    request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password + '1'
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeFalsy()
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toBe(1)
          done()
        }).catch((e) => done(e))
      })
  })
})
