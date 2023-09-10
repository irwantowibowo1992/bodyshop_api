const { uploadFile } = require('../utils/file.util');
const SuccessResult = require('../utils/response.util');

async function generateImageUrl(req, res, next) {
  const file = req.file;
  const { folder } = req.body;

  const result = await uploadFile(file.buffer, `bodyshop/${folder}`);
  SuccessResult.make(res).send(result);
}

module.exports = {
  generateImageUrl,
};
