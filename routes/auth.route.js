const authController = require('../app/controllers/auth.controller');

const router = require('express-promise-router')();

router.post('/auth/register', authController.register);

router.post('/auth/login', authController.login);

module.exports = router;
