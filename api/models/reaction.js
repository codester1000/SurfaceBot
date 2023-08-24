const mongoose = require('mongoose')

const reactionSchema = mongoose.Schema(
    {
        reactionID: { type: String, required: true},
        messageID: { type: String, required: true},
        userID: { type: String, required: true},
        emoji: { type: String },
        emojiID: { type: String },
        karma: { type: Number, default: 0}
    }
)

const ReactionData = mongoose.model('ReactionData', reactionSchema)

module.exports = ReactionData