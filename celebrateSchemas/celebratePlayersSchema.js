const { Joi } = require('celebrate')

const celebratePlayerSchema = {
  query: Joi.object().keys({
    min_tituAndSubs: Joi.number().integer(),
    min_tituAndSubsLast10games: Joi.number().integer(),
    max_cote: Joi.number().integer(),
    min_goals: Joi.number().integer(),
    position: Joi.string().regex(/(^(([A-Z]\|)|[A-Z]$)+$)|^[A-Z]$/)
    /*
      'D|A'   => OK (Défenseurs or Attaquants)
      'A'      => OK (Attaquants only)
      'ADG'    => not OK
      'D|A|efefef' => not OK
      ...
    */
  })
}

module.exports = {
  celebratePlayerSchema
}
