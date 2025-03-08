const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const auth = require('../middleware/auth');

// Add Hotel (Police Admin Only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'police') return res.status(403).json({ error: 'Unauthorized' });

  const hotel = new Hotel({ ...req.body, createdBy: req.user.userId });
  try {
    await hotel.save();
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add hotel' });
  }
});

// Get All Hotels
router.get('/', auth, async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

module.exports = router;