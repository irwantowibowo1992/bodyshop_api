const router = require('express-promise-router')();
const categoryController = require('../app/controllers/category.controller');
const { auth } = require('../app/middlewares/authrization.middleware');

router.get('/categories', categoryController.getAllCategories);

router.post('/categories', auth(['admin']), categoryController.addNewCategory);

module.exports = router;
