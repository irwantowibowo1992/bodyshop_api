const router = require('express-promise-router')();
const ProductController = require('../app/controllers/product.controller');
const { auth } = require('../app/middlewares/authrization.middleware');

router.get('/products', ProductController.getAllProduct);
router.post('/products', auth(['admin']), ProductController.addNewProduct);
router.get('/products/:id', ProductController.getDetailProduct);

module.exports = router;
