const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('QuizGame', {
    quizId: Joi.number().required(),
    playerId: Joi.number().required(),
    nbWrongAnswer: Joi.number().required(),
    questionsFailed: Joi.array().required(),
    date: Joi.date(),
    selectedAnswers: Joi.array(),
})


