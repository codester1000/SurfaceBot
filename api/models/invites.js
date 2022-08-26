const mongoose = require('mongoose')

const invitesSchema = mongoose.Schema(
  {
    serverID: { type: String, required: true },
    code: { type: String, required: true },
    uses: { type: Number, default: 0 },
    member: { type: String, required: true}
  }, 
  { timestamps: true }
)

const InvitesData = mongoose.model('InvitesData', invitesSchema)

module.exports = InvitesData