const mongoose = require("mongoose");

const discordServerSchema = mongoose.Schema({
  serverName: { type: String, required: true },
  serverID: { type: String, required: true },
  icon: { type: String },
  messagesSent: { type: Number, default: 0 },
  users: [{ type: String }],
  channels: [{ type: String }],
  karma: { type: Number, default: 0 },
  flaggedMessages: [{ type: String }],
  messages: [{ type: String }],
});

const DiscordServerData = mongoose.model(
  "DiscordServerData",
  discordServerSchema
);

module.exports = DiscordServerData;
