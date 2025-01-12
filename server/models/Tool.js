const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true  , unique:true},
  category: { type: String, required: true },
  image: { type: String },
  quantity: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Tool', toolSchema);
