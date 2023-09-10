const router = require('express-promise-router')();
const itemCategoryController = require('../app/controllers/itemCategory.controller');
const { auth } = require('../app/middlewares/authrization.middleware');

router.get('/item-categories', itemCategoryController.getAllItemCategories);
router.post(
  '/item-categories',
  auth(['admin']),
  itemCategoryController.addNewItemCategory
);

module.exports = router;
