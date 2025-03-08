const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  idProof: { type: String, required: true },
  photo: { type: String, required: true }, // Cloudinary URL
  mobileNumber: { type: String, required: true },
  reasonForStay: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
});

module.exports = mongoose.model('Visitor', visitorSchema);