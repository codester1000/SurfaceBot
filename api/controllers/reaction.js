const express = require('express')

const ReactionData = require('../models/reaction')

const reactionRouter = express.Router()

reactionRouter.get('/', async (req, res) => {
  const reactions = await ReactionData.find({}).exec()
  res.status(200).json(reactions)
})

module.exports = reactionRouter
