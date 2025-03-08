const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotels');
const visitorRoutes = require('./routes/visitors');
const uploadRoutes = require('./routes/upload'); // Import the upload route
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();

require('dotenv').config(); // Load environment variables

// Debug: Check if environment variables are loaded
console.log('Environment Variables:', {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/hotels', hotelRoutes); // Hotel management routes
app.use('/api/visitors', visitorRoutes); // Visitor management routes
app.use('/api', uploadRoutes); // Image upload route

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Connect to DB
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));