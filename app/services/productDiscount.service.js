const ProductDiscount = require('../models/productDiscount.model');
const NotFoundError = require('../exceptions/notFound.exception');
const Paginate = require('../utils/paginate.util');

async function getAllProductDiscount(query) {
  const options = {
    page: query.page || 1,
    limit: query.size || 2,
  };
  const results = await ProductDiscount.find();

  return new Paginate(results, options.page, options.limit).process();
}

async function addProductDiscount(data) {
  const dataToInsert = {
    product: data.product,
    discount: data.discount,
    discount_type: data.discount_type,
    valid_from: data.valid_from,
    valid_to: data.valid_to,
  };

  return await ProductDiscount.create(dataToInsert);
}

async function getDetailDiscount(id) {
  const result = await ProductDiscount.findById(id);

  if (!result) {
    throw new NotFoundError('Data tidak ditemukan');
  }

  return result;
}

async function updateProductDiscount(id, data) {
  const checkDiscount = await getDetailDiscount(id);

  if (!checkDiscount) {
    throw new NotFoundError('Data tidak ditemukan');
  }

  checkDiscount.discount = data.discount;
  checkDiscount.discount_type = data.discount_type;
  checkDiscount.valid_from = data.valid_from;
  checkDiscount.valid_to = data.valid_to;
  await checkDiscount.save();

  return 'success';
}

async function deleteProductDiscount(id) {
  const checkDiscount = await getDetailDiscount(id);
  if (!checkDiscount) {
    throw new NotFoundError('Data tidak ditemukan');
  }
  return await checkDiscount.deleteOne();
}

module.exports = {
  getAllProductDiscount,
  addProductDiscount,
  getDetailDiscount,
  updateProductDiscount,
  deleteProductDiscount,
};
