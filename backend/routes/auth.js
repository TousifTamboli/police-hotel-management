const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Route
router.post("/register", async (req, res) => {
  const { email, password, role, hotelId } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({ email, password: hashedPassword, role, hotelId });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Ensure `hotelId` exists before signing the token
    if (!user.hotelId) {
      return res.status(403).json({ error: "Access denied. No hotel associated." });
    }

    // Generate JWT with `hotelId`
    const token = jwt.sign(
      { userId: user._id, role: user.role, hotelId: user.hotelId.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    res.status(200).json({ message: "Login successful", token, user: { id: user._id, email: user.email, role: user.role, hotelId: user.hotelId } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});


// Logout Route
// router.post('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.status(200).json({ message: 'Logged out successfully' });
// });

module.exports = router;
