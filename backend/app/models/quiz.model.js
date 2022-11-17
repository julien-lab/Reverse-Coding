const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
    theme: Joi.string().required(),
    name: Joi.string().required(),
    date: Joi.date(),
    questions: Joi.array(),
    userId: Joi.number()
})

