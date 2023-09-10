const router = require('express-promise-router')();
const { auth } = require('../app/middlewares/authrization.middleware');
const cartController = require('../app/controllers/cart.controller');

router.get('/carts', auth(['user']), cartController.getCart);
router.post('/carts', auth(['user']), cartController.addToCart);
router.delete('/carts/item/:id', auth(['user']), cartController.deleteItemCart);

module.exports = router;
