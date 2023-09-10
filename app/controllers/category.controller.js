const categoryService = require('../services/category.service');
const SuccessResult = require('../utils/response.util');

async function getAllCategories(req, res) {
  const data = await categoryService.getAllCategories();

  SuccessResult.make(res).send(data);
}

async function addNewCategory(req, res) {
  const body = req.body;
  await categoryService.addNewCategory(body);
  SuccessResult.make(res).sendMessage('Data berhasil ditambahkan');
}

module.exports = {
  getAllCategories,
  addNewCategory,
};
