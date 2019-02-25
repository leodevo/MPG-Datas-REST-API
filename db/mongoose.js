var mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
  console.log('connected to mongoDB service')
}, (err) => {
  console.log(err)
})

module.exports = { mongoose }
