const router = require('express-promise-router')();
const ProductController = require('../app/controllers/product.controller');
const { auth } = require('../app/middlewares/authrization.middleware');
const ValidationMiddleware = require('../app/middlewares/validation.middleware');
const productValidationSchema = require('../app/validations/product.validation');

router.get('/products', ProductController.getAllProduct);
router.post(
  '/products',
  auth(['admin']),
  ValidationMiddleware.validateBody(productValidationSchema.addCategory),
  ProductController.addNewProduct
);
router.get('/products/:id', ProductController.getDetailProduct);

module.exports = router;
