const mongoose = require("mongoose");

const channelSchema = mongoose.Schema({
  channelName: { type: String, required: true },
  channelID: { type: String, required: true },
  type: { type: Number, required: true },
  messagesSent: { type: Number, default: 0 },
  voiceChatTime: { type: Number, default: 0 },
  messages: [{ type: String }],
  content: { type: Boolean, default: true },
  karma: { type: Number, default: 0 },
});

const ChannelData = mongoose.model("ChannelData", channelSchema);

module.exports = ChannelData;
