const mongoose = require("mongoose");

const hotelOwnerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ownerName: { type: String, required: true },
  hotelName: { type: String, required: true },
  address: { type: String, required: true },
  noc: { type: String },
  buildingCert: { type: String },
  tradeLicense: { type: String },
  policeVerification: { type: String },
  fireSafety: { type: String },
  gst: { type: String },
  insurance: { type: String }
});

const HotelOwner = mongoose.model("HotelOwner", hotelOwnerSchema);
module.exports = { HotelOwner };
