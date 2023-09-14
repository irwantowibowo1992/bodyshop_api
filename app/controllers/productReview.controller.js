const productReviewService = require('../services/productReview.service');
const SuccessResult = require('../utils/response.util');

async function getAllReviews(req, res) {
  const { id } = req.params;
  const query = req.query;
  const data = await productReviewService.getAllReviews(id, query);

  SuccessResult.make(res).send(data);
}

async function addReview(req, res) {
  const { id } = req.params;
  const user = req.user;
  const body = req.body;

  await productReviewService.addReview(id, user, body);
  SuccessResult.make(res).sendMessage('Berhasil menambahkan review');
}

module.exports = {
  getAllReviews,
  addReview,
};
