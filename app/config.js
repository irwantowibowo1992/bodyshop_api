const dotenv = require('dotenv');
dotenv.config();

// Cloudinary config
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  cloudinary,
  jwtExpiration: '3h',
  jwtSecret: 'ksjdhfas89asdfahdfas9jdkfa8',
};
