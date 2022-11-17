const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Question', {
  label: Joi.string().required(),
  numero: Joi.number().required(),
  answers: Joi.array(),
  quizId: Joi.number(),
  clue: Joi.string(),
  timer: Joi.number(),
})


