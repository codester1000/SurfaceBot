const mongoose = require('mongoose')

const discordServerSchema = mongoose.Schema(
  {
    serverName: { type: String, required: true},
    serverID: { type: String, required: true},
    messagesSent: { type: Number, required: true },
    users: [ { type: String } ]
  }
)

const DiscordServerData = mongoose.model('DiscordServerData', discordServerSchema)

module.exports = DiscordServerData