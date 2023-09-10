const slugify = require('slugify');
const Product = require('../models/product.model');

async function getAllProduct() {
  return Product.find().populate({
    path: 'category',
    select: '_id name',
  });
}

async function addNewProduct(data) {
  let dataToInsert = {
    name: data.name,
    description: data.description,
    slug: slugify(data.name, {
      replacement: '-',
      lower: true,
      trim: true,
    }),
    price: data.price,
    category: data.category,
  };

  const images = [];
  for (const element of data.images) {
    images.push({
      url: element.url,
      isMainImage: element.isMainImage || false,
    });
  }
  dataToInsert.productImages = images;

  return await Product.create(dataToInsert);
}

async function getDetailProduct(id) {
  return Product.findById(id).populate({
    path: 'category',
    select: '_id name',
  });
}

module.exports = {
  getAllProduct,
  addNewProduct,
  getDetailProduct,
};
