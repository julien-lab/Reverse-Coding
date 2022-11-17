const { Router } = require('express')
const { QuizGame } = require('../../models')
const router = new Router()

router.get('/', (req, res) => {
    try {
        const quizGames = QuizGame.get()
        res.status(200).json(quizGames)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/:quizGameId', (req, res) => {
    try {
        res.status(200).json(QuizGame.delete(req.params.quizGameId))
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:quizGameId', (req, res) => {
    try {
        res.status(200).json(QuizGame.update(req.params.quizGameId, req.body))
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/', (req, res) => {
    try {
        const quizGame = QuizGame.create({ ...req.body })
        res.status(201).json(quizGame)
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json(err.extra)
        } else {
            res.status(500).json(err)
        }
    }
})

module.exports = router
