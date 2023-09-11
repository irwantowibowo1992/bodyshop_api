const authController = require('../app/controllers/auth.controller');
const ValidationMiddleware = require('../app/middlewares/validation.middleware');
const authValidationSchema = require('../app/validations/auth.validation');

const router = require('express-promise-router')();

router.post(
  '/auth/register',
  ValidationMiddleware.validateBody(authValidationSchema.register),
  authController.register
);

router.post(
  '/auth/login',
  ValidationMiddleware.validateBody(authValidationSchema.loginEmail),
  authController.login
);

module.exports = router;
