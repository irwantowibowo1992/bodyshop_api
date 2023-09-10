const router = require('express-promise-router')();
const { auth } = require('../app/middlewares/authrization.middleware');
const userController = require('../app/controllers/user.controller');

router.get('/profile', auth(['user']), userController.getProfile);

router.patch('/profile', auth(['user']), userController.updateProfile);

module.exports = router;
