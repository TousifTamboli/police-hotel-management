const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['police', 'hotelOwner'], required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }, // For hotel owners
});

module.exports = mongoose.model('User', userSchema);