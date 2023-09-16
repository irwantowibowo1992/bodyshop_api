const productDiscountService = require('../services/productDiscount.service');
const SuccessResult = require('../utils/response.util');

async function getAllProductDiscount(req, res) {
  const query = req.query;
  const data = await productDiscountService.getAllProductDiscount(query);

  SuccessResult.make(res).send(data);
}

async function addProductDiscount(req, res) {
  const body = req.body;
  await productDiscountService.addProductDiscount(body);

  SuccessResult.make(res).sendMessage('Berhasil menambahkan diskon produk');
}

async function getDetailDiscount(req, res) {
  const { id } = req.params;
  const data = await productDiscountService.getDetailDiscount(id);
  SuccessResult.make(res).send(data);
}

async function updateProductDiscount(req, res) {
  const { id } = req.params;
  const body = req.body;

  await productDiscountService.updateProductDiscount(id, body);
  SuccessResult.make(res).sendMessage('Diskon berhasil dirubah');
}

async function deleteProductDiscount(req, res) {
  const { id } = req.params;

  await productDiscountService.deleteProductDiscount(id);
  SuccessResult.make(res).sendMessage('Diskon berhasil dihapus');
}

module.exports = {
  getAllProductDiscount,
  addProductDiscount,
  getDetailDiscount,
  updateProductDiscount,
  deleteProductDiscount,
};
