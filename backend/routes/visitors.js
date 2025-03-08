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

module.exports = router;