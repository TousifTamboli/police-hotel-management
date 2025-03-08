const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary'); // Use require
const router = express.Router();

// Configure Multer for temporary file storage
const upload = multer({ dest: 'uploads/' });

// Upload image to Cloudinary
router.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'hotel-visitors', // Optional: Organize images in a folder
    });

    // Return the Cloudinary URL
    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Image upload failed', details: error.message });
  }
});

module.exports = router; // Use module.exports