const mongoose = require('mongoose');

const toolCategory = new mongoose.Schema({
  name: { type: String, required: true  , unique : true },
}, { timestamps: true });

module.exports = mongoose.model('ToolCategory', toolCategory);
