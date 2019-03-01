const { ObjectID } = require('mongodb')
const jwt = require('jsonwebtoken')

const { User } = require('./../../models/user')

const userOneId =  new ObjectID()
const userTwoId =  new ObjectID()

const users = [{
  _id: userOneId,
  email: 'leo@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc12345').toString()
  }]
}, {
  _id: userTwoId,
  email: 'hey@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: userTwoId, access: 'auth' }, 'abc12345').toString()
  }]
}]

const populateUsers = (done) => {
  User.deleteMany({}).then(() => {
    let userOne = new User(users[0]).save()
    let userTwo = new User(users[1]).save()

    return Promise.all([userOne, userTwo])

  }).then(() => done())
}

module.exports = {
  users,
  populateUsers
}
