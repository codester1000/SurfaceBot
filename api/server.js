require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
var cors = require('cors')

const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL

app.use(cors())


const userController = require("./controllers/user")
const discordServerController = require("./controllers/discordserver")

app.use("/servers", discordServerController)
app.use("/users", userController)

mongoose.connect(dbURL, () => {
  console.log("connected to surfaceDB")
})

app.listen(PORT, () => {
  console.log('port', PORT)
})