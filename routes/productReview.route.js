const router = require('express-promise-router')();
const productReviewController = require('../app/controllers/productReview.controller');
const { auth } = require('../app/middlewares/authrization.middleware');

router.get('/reviews', productReviewController.getAllReviews);
router.get('/reviews', auth(['user']), productReviewController.addReview);

module.exports = router;
