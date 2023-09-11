const router = require('express-promise-router')();
const itemCategoryController = require('../app/controllers/itemCategory.controller');
const { auth } = require('../app/middlewares/authrization.middleware');
const ValidationMiddleware = require('../app/middlewares/validation.middleware');
const categoryValidationSchema = require('../app/validations/category.validation');

router.get('/item-categories', itemCategoryController.getAllItemCategories);
router.post(
  '/item-categories',
  auth(['admin']),
  ValidationMiddleware.validateBody(categoryValidationSchema.addCategory),
  itemCategoryController.addNewItemCategory
);

module.exports = router;
