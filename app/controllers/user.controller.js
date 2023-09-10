const userService = require('../services/user.service');
const SuccessResult = require('../utils/response.util');

async function getProfile(req, res) {
  const user = req.user;
  const data = await userService.getProfile(user);

  SuccessResult.make(res).send(data);
}

async function updateProfile(req, res) {
  const user = req.user;
  const body = req.body;

  await userService.updateProfile(user, body);
  SuccessResult.make(res).sendMessage('Profile berhasil diupdate');
}

module.exports = {
  getProfile,
  updateProfile,
};
