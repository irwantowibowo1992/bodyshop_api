const subCategoryService = require('../services/subCategory.service');
const SuccessResult = require('../utils/response.util');

async function getAllSubCatgories(req, res) {
  const data = await subCategoryService.getAllSubCategories();

  SuccessResult.make(res).send(data);
}

async function addNewSubCategory(req, res) {
  const body = req.body;

  await subCategoryService.addNewSubCategory(body);
  SuccessResult.make(res).sendMessage('Data berhasil ditambahkan');
}

module.exports = {
  getAllSubCatgories,
  addNewSubCategory,
};
