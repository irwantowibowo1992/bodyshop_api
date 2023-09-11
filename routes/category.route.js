const router = require('express-promise-router')();
const categoryController = require('../app/controllers/category.controller');
const { auth } = require('../app/middlewares/authrization.middleware');
const ValidationMiddleware = require('../app/middlewares/validation.middleware');
const categoryValidationSchema = require('../app/validations/category.validation');

router.get('/categories', categoryController.getAllCategories);

router.post(
  '/categories',
  auth(['admin']),
  ValidationMiddleware.validateBody(categoryValidationSchema.addCategory),
  categoryController.addNewCategory
);

module.exports = router;
