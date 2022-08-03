require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL

mongoose.connect()

const dataController = require("./controllers/data")

app.use("/", dataController)

mongoose.connect(dbURL, () => {
  console.log("connected to surfaceDB")
})

app.listen(PORT, () => {
  console.log('port', PORT)
})