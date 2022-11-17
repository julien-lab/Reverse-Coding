const { Router } = require('express')

const { Question } = require('../../../../models')
const util  = require('../../../../utils/user-util')

const router = new Router({ mergeParams: true })
const AnswerRouter  = require('./answers')

router.get('/', (req, res) => {
  try {
    const questionsWithAnswers = util.associateAllAnswers();
    res.status(200).json(questionsWithAnswers)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:questionId', (req, res) => {
  try {
    const questionWithAnswers = util.associateAnswers(req.params.questionId);
    res.status(200).json(questionWithAnswers)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:questionId', (req, res) => {
  try {
    res.status(200).json(Question.delete(req.params.questionId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:questionId', (req, res) => {
  try {
    res.status(200).json(Question.update(req.params.questionId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const question = Question.create({ ...req.body , quizId: parseInt(req.params.quizId)})
    res.status(201).json(question)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

router.use('/:questionId/answers', AnswerRouter)

module.exports = router
