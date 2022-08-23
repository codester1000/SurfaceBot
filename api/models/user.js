const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  { 
    username: { type: String, required: true },
    discriminator: { type: String, required: true },
    userID:  { type: Number, required: true},
    numberOfMessages: { type: Number, default: 0 },
    messages: [ { type: String } ],
    avatar: { type: String},
    banner: { type: String},
    accentColor: { type: String},
    startVoiceTime: { type: Number },
    voiceChatTime: { type: Number, default: 0 },
  }
)

const UserData = mongoose.model('UserData', userSchema)

module.exports = UserData