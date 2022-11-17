const { Router } = require('express')

const { Player } = require('../../../models')
const util = require('../../../utils/user-util')
const router = new Router({ mergeParams: true })

router.get('/', (req, res) => {
  try {
    const playersWithQuizGames = util.associateAllQuizGames(req.params.userId);
    res.status(200).json(playersWithQuizGames)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:playerId', (req, res) => {
  try {
    const playerWithQuizGames = util.associateQuizGames(req.params.playerId);
    res.status(200).json(playerWithQuizGames)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:playerId', (req, res) => {
  try {
    res.status(200).json(Player.delete(req.params.playerId))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:playerId', (req, res) => {
  try {
    res.status(200).json(Player.update(req.params.playerId, req.body))
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', (req, res) => {
  try {
    const player = Player.create({ ...req.body, userId: parseInt(req.params.userId) })
    res.status(201).json(player)
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra)
    } else {
      res.status(500).json(err)
    }
  }
})

module.exports = router
