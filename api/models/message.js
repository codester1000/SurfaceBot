const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    messageID: { type: String, required: true },
    messageContent: { type: String, required: true },
    replyMessageId: [{ type: String }],
    mentions: [{ type: String }],
    date: { type: Date },
    messageKarma: { type: Number, default: 0 },
    karma: { type: Number, default: 0 },
    flag: { type: Boolean, default: false },
    flags: { type: String },
    flagCategoryScores: { type: Object },
    user: { type: String, required: true },
  },
  { timestamps: true }
);

const MessageData = mongoose.model("MessageData", messageSchema);

module.exports = MessageData;

// catching farmers and flaggin gmessages
// this could be done using message timeframe
// linking messages together, judging engagement via responses in casual channels
