const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, unique: true, required: true, maxlength: 10 },
  password: { type: String, required: true },
  picture: { type: String },
  level: { type: String, enum: ['Expert', 'Medium', 'New Recruit', 'Trainee'], required: true },
  role: { type: String, enum: ['admin', 'mechanic'], default: 'mechanic' },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);
