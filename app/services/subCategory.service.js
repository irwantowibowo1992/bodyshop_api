const SubCategory = require('../models/subCategory.model');
const slugify = require('slugify');

async function getAllSubCategories() {
  await SubCategory.find();
}

async function addNewSubCategory(data) {
  return await SubCategory.create({
    name: data.name,
    slug: slugify(data.name, {
      replacement: '-',
      lower: true,
      trim: true,
    }),
    description: data.description,
    category: data.category,
  });
}

module.exports = {
  getAllSubCategories,
  addNewSubCategory,
};
