const express = require('express')

const ChannelData = require('../models/channel')

const channelRouter = express.Router()

channelRouter.get('/', async (req, res) => {
  const channels = await ChannelData.find({}).exec()
  res.status(200).json(channels)
})

module.exports = channelRouter
