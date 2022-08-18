const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  { 
    username: { type: String, required: true },
    userID:  { type: Number, required: true},
    numberOfMessages: { type: Number, default: 0 },
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User