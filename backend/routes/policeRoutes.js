const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const POLICE_EMAIL = process.env.POLICE_EMAIL;
const POLICE_PASSWORD = process.env.POLICE_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === POLICE_EMAIL && password === POLICE_PASSWORD) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

module.exports = router;
