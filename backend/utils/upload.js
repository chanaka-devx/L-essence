const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

// Configure Cloudinary
const cloudName = process.env.CLOUDINARY_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Validate Cloudinary credentials
if (!cloudName || !apiKey || !apiSecret) {
  console.error('Cloudinary credentials are missing!');
  console.error(`CLOUDINARY_NAME: ${cloudName ? 'Present' : 'Missing'}`);
  console.error(`CLOUDINARY_API_KEY: ${apiKey ? 'Present' : 'Missing'}`);
  console.error(`CLOUDINARY_API_SECRET: ${apiSecret ? 'Present' : 'Missing'}`);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

// Configure Multer to use memory storage instead of disk storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to upload buffer to Cloudinary
const uploadToCloudinary = async (fileBuffer, folder = 'L-essence') => {
  // Validate credentials again before trying to upload
  if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary credentials are not properly configured');
  }

  if (!fileBuffer) {
    throw new Error('No file buffer provided for upload');
  }

  return new Promise((resolve, reject) => {
    try {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result);
        }
      );
      
      uploadStream.end(fileBuffer);
    } catch (error) {
      console.error('Error setting up Cloudinary upload:', error);
      reject(error);
    }
  });
};

module.exports = {
  upload,
  uploadToCloudinary,
  cloudinary
};
