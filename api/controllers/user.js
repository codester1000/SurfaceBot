const express = require('express')

const User = require('../models/user')
const userRouter = express.Router()


userRouter.get('/:userID', async (req, res) => {
  const users = await User.find({}).exec()
  res.status(200).json(users)
})

userRouter.post('/', async (req, res) => {
  try{
    const newUser = await User.create(req.body)
    res.status(200).json(newUser)
  } catch (err) {
    // This may error log during dev, delete at deployment
    console.log(err)
    console.log('OOPS')
  }
})

userRouter.put('/:userID', async(req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.boardID, req.body, { new: true }).exec()
  res.status(200).json(updatedUser)
})

userRouter.delete('/:userID', async(req, res) => {
  const updatedUser = await User.findByIdAndRemove(req.params.boardID).exec()
  res.status(200).json(updatedUser)
})