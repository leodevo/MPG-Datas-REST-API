const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

// Overrides toJSON methods, used when sending back datas to the client
UserSchema.methods.toJSON = function () {
  let user = this
  let userOject = user.toObject()
  return _.pick(userOject, ['_id', 'email']) // only returning those 2 properties to the client
}

// '.methods' => instance method
UserSchema.methods.generateAuthToken = function () {
  let user = this
  let access = 'auth'
  let token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, 'abc12345').toString() // TODO move salt into a configuration variable

  user.tokens = user.tokens.concat([{
    access,
    token
  }])

  console.log('user.tokens.length :', user.tokens.length)

  return user.save().then(() => {
    return token
  })
}

// '.statics' =>  model method
UserSchema.statics.findByToken = function (token) {
  let User = this
  let decoded

  // First step is to verify token authenticity

  // jwt.verify() will throw if verification fails (token value manipulated or secret salt wrong)
  try {
    decoded = jwt.verify(token, 'abc12345') // TODO move salt into a configuration variable
  } catch (e) {
    return Promise.reject(e)
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': decoded.access
  })
}

let User = mongoose.model('User', UserSchema)

module.exports = { User }
