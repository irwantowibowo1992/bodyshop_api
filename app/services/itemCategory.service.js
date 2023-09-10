const slugify = require('slugify');
const ItemCategory = require('../models/itemCategory.model');

async function getAllItemCategories() {
  // return ItemCategory.find().populate('category');

  return ItemCategory.aggregate([
    // {
    //   $match: { name: 'Hair' }, // Filter ItemCategory yang sesuai
    // },
    {
      $lookup: {
        from: 'categories', // Nama koleksi 'Category' di database Anda
        let: { itemCategoryId: '$_id' }, // Variabel lokal untuk menyimpan _id ItemCategory
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$itemCategory', '$$itemCategoryId'] }, // Pencocokan dengan _id ItemCategory
            },
          },
        ],
        as: 'categories', // Alias untuk hasil lookup
      },
    },
  ]);
}

async function addNewItemCategory(data) {
  return await ItemCategory.create({
    name: data.name,
    description: data.description,
    slug: slugify(data.name, {
      replacement: '-',
      lower: true,
      trim: true,
    }),
  });
}

module.exports = {
  getAllItemCategories,
  addNewItemCategory,
};
