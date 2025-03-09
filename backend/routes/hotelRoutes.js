const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { HotelOwner } = require("../models/hotelModel");

const JWT_SECRET = process.env.JWT_SECRET;

// Configure multer for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to upload images to Cloudinary
const uploadImage = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${file.buffer.toString("base64")}`, {
      folder: "hotel_docs",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

// Signup Route
router.post(
  "/signup",
  upload.fields([
    { name: "noc" },
    { name: "buildingCert" },
    { name: "tradeLicense" },
    { name: "policeVerification" },
    { name: "fireSafety" },
    { name: "gst" },
    { name: "insurance" },
  ]),
  async (req, res) => {
    try {
      const { email, password, ownerName, hotelName, address } = req.body;
      const existingUser = await HotelOwner.findOne({ email });

      if (existingUser) return res.status(400).json({ message: "Email already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      // Upload images
      const noc = req.files["noc"] ? await uploadImage(req.files["noc"][0]) : null;
      const buildingCert = req.files["buildingCert"] ? await uploadImage(req.files["buildingCert"][0]) : null;
      const tradeLicense = req.files["tradeLicense"] ? await uploadImage(req.files["tradeLicense"][0]) : null;
      const policeVerification = req.files["policeVerification"]
        ? await uploadImage(req.files["policeVerification"][0])
        : null;
      const fireSafety = req.files["fireSafety"] ? await uploadImage(req.files["fireSafety"][0]) : null;
      const gst = req.files["gst"] ? await uploadImage(req.files["gst"][0]) : null;
      const insurance = req.files["insurance"] ? await uploadImage(req.files["insurance"][0]) : null;

      const newHotelOwner = new HotelOwner({
        email,
        password: hashedPassword,
        ownerName,
        hotelName,
        address,
        noc,
        buildingCert,
        tradeLicense,
        policeVerification,
        fireSafety,
        gst,
        insurance,
      });

      await newHotelOwner.save();
      res.status(201).json({ message: "Signup successful" });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Server error", error });
    }
  }
);

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await HotelOwner.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
