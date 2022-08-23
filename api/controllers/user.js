const express = require('express')

const UserData = require('../models/user')

const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
  const users = await UserData.find({}).exec()
  res.status(200).json(users)
})

module.exports = userRouter
