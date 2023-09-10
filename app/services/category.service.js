const slugify = require('slugify');
const Category = require('../models/category.model');

async function getAllCategories() {
  return await Category.find();
}

async function addNewCategory(data) {
  return await Category.create({
    name: data.name,
    description: data.description,
    slug: slugify(data.name, {
      replacement: '-',
      lower: true,
      trim: true,
    }),
    itemCategory: data.item_category,
  });
}

module.exports = {
  getAllCategories,
  addNewCategory,
};
