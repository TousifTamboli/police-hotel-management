const express = require('express');
const Visitor = require('../models/Visitor');
const auth = require('../middleware/auth');
const router = express.Router();

// Add Visitor
router.post('/', auth, async (req, res) => {
  const { hotelId, name, age, idProof, photo, mobileNumber, reasonForStay, checkInDate, checkOutDate } = req.body;

  try {
    const visitor = new Visitor({
      hotelId,
      name,
      age,
      idProof,
      photo,
      mobileNumber,
      reasonForStay,
      checkInDate,
      checkOutDate,
    });
    await visitor.save();
    res.status(201).json(visitor);
  } catch (error) {
    console.error('Error adding visitor:', error);
    res.status(500).json({ error: 'Failed to add visitor', details: error.message });
  }
});

// Get all visitors for the logged-in hotel owner's hotel
router.get("/", auth, async (req, res) => {
  try {
    console.log("Decoded user:", req.user); // 🔥 Debugging log

    // Find visitors linked to this user’s hotel
    const visitors = await Visitor.find({ hotelId: { $exists: true } });

    if (!visitors || visitors.length === 0) {
      return res.status(403).json({ error: "Access denied. No hotel associated." });
    }

    console.log("Visitors found:", visitors);
    res.status(200).json(visitors);
  } catch (error) {
    console.error("Error fetching visitors:", error);
    res.status(500).json({ error: "Failed to fetch visitors", details: error.message });
  }
});




module.exports = router;