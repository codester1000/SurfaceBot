const express = require('express')

const messageRouter = express.Router()
const MessageData = require('../models/message')


messageRouter.get('/', async (req, res) => {
  const servers = await MessageData.find({}).exec()
  res.status(200).json(servers)
})


module.exports = messageRouter