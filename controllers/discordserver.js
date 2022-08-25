const express = require('express')

const discordServerRouter = express.Router()
const DiscordServerData = require('../models/discordserver')


discordServerRouter.get('/', async (req, res) => {
  const servers = await DiscordServerData.find({}).exec()
  res.status(200).json(servers)
})

module.exports = discordServerRouter
