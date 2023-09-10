const router = require('express-promise-router')();
const { auth } = require('../app/middlewares/authrization.middleware');
const orderController = require('../app/controllers/order.controller');

router.get('/orders', auth(['admin']), orderController.getAllOrders);

router.get('/orders/:id', orderController.getDetailOrder);

router.post('/orders/checkout', auth(['user']), orderController.checkout);

router.post('/orders/notifications/paid', orderController.notification);

module.exports = router;
