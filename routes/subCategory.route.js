const router = require('express-promise-router')();
const subCategoryController = require('../app/controllers/subCategory.controller');

router.get('/sub-categories', subCategoryController.getAllSubCatgories);
router.post('/sub-categories', subCategoryController.addNewSubCategory);

module.exports = router;
