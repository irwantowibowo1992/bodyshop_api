const itemCategoryService = require('../services/itemCategory.service');
const SuccessResult = require('../utils/response.util');

async function getAllItemCategories(req, res) {
  const data = await itemCategoryService.getAllItemCategories();

  SuccessResult.make(res).send(data);
}

async function addNewItemCategory(req, res) {
  const body = req.body;

  await itemCategoryService.addNewItemCategory(body);
  SuccessResult.make(res).sendMessage('Data berhasil ditambahkan');
}

module.exports = {
  getAllItemCategories,
  addNewItemCategory,
};
