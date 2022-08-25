const mongoose = require('mongoose')

const moderatorSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    serverID: { type: Number, required: true }
  }, 
  { timestamps: true }
)

const Moderator = mongoose.model('Moderator', moderatorSchema)

module.exports = Moderator