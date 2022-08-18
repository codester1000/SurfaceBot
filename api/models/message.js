const mongoose = require('mongoose')

const messageSchema = mongoose.Schema(
  {
    messageContent: {type: String, required: true},
    reply: {type: Boolean, required: true},
    replyMessageId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    mention: String
  }, 
  { timestamps: true }
)

const Message = mongoose.model('Message', messageSchema)

module.exports = Message