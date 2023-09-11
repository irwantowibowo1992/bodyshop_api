const router = require('express-promise-router')();
const subCategoryController = require('../app/controllers/subCategory.controller');
const ValidationMiddleware = require('../app/middlewares/validation.middleware');
const categoryValidationSchema = require('../app/validations/category.validation');

router.get('/sub-categories', subCategoryController.getAllSubCatgories);
router.post(
  '/sub-categories',
  ValidationMiddleware.validateBody(categoryValidationSchema.addCategory),
  subCategoryController.addNewSubCategory
);

module.exports = router;
