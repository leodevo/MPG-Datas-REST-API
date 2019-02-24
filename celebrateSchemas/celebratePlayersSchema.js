const { Joi } = require('celebrate')

const celebratePlayerSchema = {
  query: Joi.object().keys({
    tituAndSubsMin: Joi.number().integer(),
    tituAndSubsMinLast10games: Joi.number().integer(),
    coteMax: Joi.number().integer()
  })
}

module.exports = {
  celebratePlayerSchema
}
