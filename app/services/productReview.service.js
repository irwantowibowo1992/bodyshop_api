const ProductReview = require('../models/productReview.model');
const Product = require('../models/product.model');
const NotFoundError = require('../exceptions/notFound.exception');

async function getAllReviews(id, { page = 1, size = 10 }) {
  params = {
    product: id,
  };

  const options = {
    page: page,
    limit: size,
    populate: {
      path: 'product',
      select: '_id name',
    },
    populate: {
      path: 'user',
      select: '_id name',
    },
  };

  return ProductReview.paginate(params, options);
}

async function addReview(id, user, data) {
  const checkData = await Product.findById(id);

  if (!checkData) {
    throw new NotFoundError('Data tidak ditemukan');
  }

  return await ProductReview.create({
    user: user.id,
    product: id,
    review: data.review,
    rating: data.rating,
  });
}

module.exports = {
  getAllReviews,
  addReview,
};
