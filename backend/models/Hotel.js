const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  noc: { type: String },
  completionCertificate: { type: String },
  tradeLicense: { type: String },
  policeVerification: { type: String },
  fireSafetyCertificate: { type: String },
  gstRegistration: { type: String },
  propertyInsurance: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Hotel', hotelSchema);