const router = require('express-promise-router')();
const productDiscountController = require('../app/controllers/productDiscount.controller');
const ValidationMiddleware = require('../app/middlewares/validation.middleware');
const discountValidationSchema = require('../app/validations/discount.validation');
const generalValidationSchema = require('../app/validations/general.validation');
const { auth } = require('../app/middlewares/authrization.middleware');

router.get(
  '/discounts/product',
  productDiscountController.getAllProductDiscount
);

router.post(
  '/discounts/product',
  ValidationMiddleware.validateBody(
    discountValidationSchema.addProductDiscount
  ),
  productDiscountController.addProductDiscount
);

router.get(
  '/discounts/product/:id',
  ValidationMiddleware.validateParam(generalValidationSchema.detail),
  productDiscountController.getDetailDiscount
);

router.patch(
  '/discounts/product/:id',
  auth(['admin']),
  ValidationMiddleware.validateParam(generalValidationSchema.detail),
  ValidationMiddleware.validateBody(
    discountValidationSchema.updateProductDiscount
  ),
  productDiscountController.updateProductDiscount
);

router.delete(
  '/discounts/product/:id',
  auth(['admin']),
  ValidationMiddleware.validateParam(generalValidationSchema.detail),
  productDiscountController.deleteProductDiscount
);

module.exports = router;
