const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user from token:", decoded); // 🔥 Debugging log

    req.user = decoded; // Store user details in `req.user`
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
