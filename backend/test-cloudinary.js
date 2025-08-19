const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

// Load environment variables
dotenv.config();

// Log environment variables
console.log('Checking Cloudinary Environment Variables:');
console.log(`CLOUDINARY_NAME: ${process.env.CLOUDINARY_NAME || 'undefined'}`);
console.log(`CLOUDINARY_API_KEY: ${process.env.CLOUDINARY_API_KEY || 'undefined'}`);
console.log(`CLOUDINARY_API_SECRET: ${process.env.CLOUDINARY_API_SECRET ? 'Present (hidden)' : 'undefined'}`);

// Try to configure Cloudinary
try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
  console.log('Cloudinary configuration successful');
  
  // Try to call a simple Cloudinary API
  cloudinary.api.ping((error, result) => {
    if (error) {
      console.error('Cloudinary ping failed:', error);
    } else {
      console.log('Cloudinary ping successful:', result);
    }
  });
} catch (error) {
  console.error('Error configuring Cloudinary:', error);
}
