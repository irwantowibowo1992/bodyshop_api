const productService = require('../services/product.service');
const SuccessResult = require('../utils/response.util');

async function getAllProduct(req, res) {
  const data = await productService.getAllProduct();
  SuccessResult.make(res).send(data);
}

async function addNewProduct(req, res) {
  const body = req.body;
  await productService.addNewProduct(body);
  SuccessResult.make(res).sendMessage('Data berhasil ditambahkan');
}

async function getDetailProduct(req, res) {
  const { id } = req.params;
  const data = await productService.getDetailProduct(id);
  SuccessResult.make(res).send(data);
}

module.exports = {
  getAllProduct,
  addNewProduct,
  getDetailProduct,
};
