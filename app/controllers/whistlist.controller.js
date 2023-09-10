const whislistService = require('../services/whislist.service');
const SuccessResult = require('../utils/response.util');

async function getAllWhislist(req, res) {
  const user = req.user;
  const data = await whislistService.getAllWhislist(user);
  SuccessResult.make(res).send(data);
}

async function addWhislist(req, res) {
  const user = req.user;
  const body = req.body;

  await whislistService.addWhislist(user, body);
  SuccessResult.make(res).sendMessage(
    'Product berhasil dimasukkan ke daftar whislist'
  );
}

module.exports = {
  getAllWhislist,
  addWhislist,
};
