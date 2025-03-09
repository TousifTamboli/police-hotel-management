const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

// Validate environment variables
if (!process.env.MONGO_URI || !process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("Missing required environment variables!");
  process.exit(1);
}

const app = express();

// Use middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("combined")); // Logging HTTP requests

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log("Cloudinary Configured:", cloudinary.config().cloud_name);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Rate Limiting for API routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});
app.use("/api/", limiter); // Apply rate limiting

// Routes for Police Admin
app.use("/api/police", require("./routes/policeRoutes"));

// Routes for Hotel Owners
app.use("/api/hotel", require("./routes/hotelRoutes"));

// Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Gracefully shutting down...");
  mongoose.connection.close().then(() => {
    console.log("MongoDB connection closed");
    process.exit(0); // Exits the process
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
