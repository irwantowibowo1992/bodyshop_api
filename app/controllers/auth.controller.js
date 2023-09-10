const authService = require('../services/auth.service');
const SuccessResult = require('../utils/response.util');

async function register(req, res) {
  const body = req.body;
  await authService.register(body);

  SuccessResult.make(res).send('Register berhasil');
}

async function login(req, res) {
  const body = req.body;
  const data = await authService.login(body);

  SuccessResult.make(res).sendWithHumps(data);
}

module.exports = {
  register,
  login,
};
