const express = require('express');
const imageController = require('../app/controllers/image.controller');
const upload = require('../app/middlewares/multer.middleware');
const router = express();

router.post(
  '/images',
  upload.single('image'),
  imageController.generateImageUrl
);

module.exports = router;
