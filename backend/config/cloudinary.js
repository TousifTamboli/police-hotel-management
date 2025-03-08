require('dotenv').config(); // Load environment variables

const { v2: cloudinary } = require('cloudinary');

const cloudinaryConfig = () => {

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

// Call the function to apply the configuration
cloudinaryConfig();

module.exports = cloudinary;