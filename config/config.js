var env = process.env.NODE_ENV || 'development'

// process.env.PORT is a value set if the app running on heroku. Not set if in local

console.log('**** ENV **** : ', env)

if (env === 'development' || env === 'test') {
  let config = require('./config.json')
  let envConfig = config[env]

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key]
  })
}
