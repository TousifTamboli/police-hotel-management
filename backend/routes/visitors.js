const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const auth = require('../middleware/auth');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const upload = multer({ dest: 'uploads/' });

// Add Visitor
router.post('/', auth, upload.single('photo'), async (req, res) => {
  const { hotelId, name, age, idProof, mobileNumber, reasonForStay, checkInDate, checkOutDate } = req.body;

  try {
    // Upload photo to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const visitor = new Visitor({
      hotelId,
      name,
      age,
      idProof,
      photo: result.secure_url,
      mobileNumber,
      reasonForStay,
      checkInDate,
      checkOutDate,
    });
    await visitor.save();
    res.status(201).json(visitor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add visitor' });
  }
});

// Get Visitors for a Hotel
router.get('/:hotelId', auth, async (req, res) => {
  try {
    const visitors = await Visitor.find({ hotelId: req.params.hotelId });
    res.status(200).json(visitors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
});

module.exports = router;