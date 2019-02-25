const { Joi } = require('celebrate')

const celebratePlayerSchema = {
  query: Joi.object().keys({
    min_tituAndSubs: Joi.number().integer(),
    min_tituAndSubsLast10games: Joi.number().integer(),
    max_cote: Joi.number().integer()
  })
}

module.exports = {
  celebratePlayerSchema
}
