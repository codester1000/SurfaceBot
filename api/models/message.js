const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
  {
    messageID: { type: String, required: true},
    messageContent: {type: String, required: true},
    replyMessageId: [ { type: String } ],
    mentions: [ { type: String } ],
  }, 
  { timestamps: true }
)

const MessageData = mongoose.model('MessageData', messageSchema)

module.exports = MessageData