const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  discriminator: { type: String },
  verified: { type: Boolean },
  userID: { type: String, required: true },
  serverID: { type: String },
  numberOfMessages: { type: Number, default: 0 },
  messages: [{ type: String }],
  avatar: { type: String },
  startVoiceTime: { type: Number },
  voiceChatTime: { type: Number, default: 0 },
  invitees: [{ type: String }],
  joinDate: { type: Date },
  karma: { type: Number, default: 0 },
  reactions: [{ type: String }],
  flags: [{ type: String }],
  roles: [{ type: String }],
  locale: { type: String },
  premiumType: { type: Number },
  email: { type: String },
});

const UserData = mongoose.model("UserData", userSchema);

module.exports = UserData;
