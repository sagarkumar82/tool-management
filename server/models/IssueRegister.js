const mongoose = require('mongoose');

const issueRegisterSchema = new mongoose.Schema({
  tool: { type: mongoose.Schema.Types.ObjectId, ref: 'Tool', required: true },
  mechanic: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type:Number },
  status: { type:String },
  issuedAt: { type: Date, default: Date.now },
  returnedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('IssueRegister', issueRegisterSchema);
