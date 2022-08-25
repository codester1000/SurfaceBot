const mongoose = require('mongoose')

const invitesSchema = mongoose.Schema(
  {
    serverID: { type: Number, required: true },
    code: { type: String, required: true },
    uses: { type: Number, default: 0 },
    member: { type: Number, required: true}
  }, 
  { timestamps: true }
)

const InvitesData = mongoose.model('InvitesData', invitesSchema)

module.exports = InvitesData