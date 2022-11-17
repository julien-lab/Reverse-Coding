const { Router } = require('express')
const UsersRouter = require('./users')
const QuizGamesRouter = require('./quizgames')

const router = new Router()

router.get('/status', (req, res) => res.status(200).json('ok'))
router.use('/users', UsersRouter)
router.use('/quizgames', QuizGamesRouter)

module.exports = router

