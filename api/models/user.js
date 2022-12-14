const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  { 
    username: { type: String, required: true },
    discriminator: { type: String, required: true },
    userID:  { type: String, required: true},
    serverID: { type: String},
    numberOfMessages: { type: Number, default: 0 },
    messages: [ { type: Number } ],
    avatar: { type: String},
    banner: { type: String},
    accentColor: { type: String},
    startVoiceTime: { type: Number },
    voiceChatTime: { type: Number, default: 0 },
    invitees: [ { type: String } ]
  }
)

const UserData = mongoose.model('UserData', userSchema)

module.exports = UserData