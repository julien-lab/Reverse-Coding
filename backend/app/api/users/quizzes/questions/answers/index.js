const { Router } = require('express')

const router = new Router({ mergeParams: true })

const { Answer } = require('../../../../../models')

router.get('/', (req, res) => {
  try {
    res.status(200).json(Answer.get())
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:answerId', (req, res) => {
  try {
    res.status(200).json(Answer.getById(req.params.answerId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:answerId', (req, res) => {
  try {
    res.status(200).json(Answer.delete(req.params.answerId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:answerId', (req, res) => {
  try {
    res.status(200).json(Answer.update(req.params.answerId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const answer = Answer.create({ ...req.body, questionId: parseInt(req.params.questionId) })
    res.status(201).json(answer)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})


module.exports = router
