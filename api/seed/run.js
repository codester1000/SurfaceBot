require("dotenv").config({path:__dirname+'/../.env'})

const mongoose = require('mongoose')

const User = require('../models/user')
const userData = require('./userData.json')


const dbURL = process.env.MONGODB_URL
console.log(dbURL)

mongoose.connect(dbURL, async () => {
  
  console.log('Resetting User collection')
  await User.collection.drop()
  console.log('User collection dropped')

  console.log('Inserting user data')
  const insertedUser = await User.insertMany(userData)
  console.log('Seed user inserted')


  mongoose.connection.close()
})