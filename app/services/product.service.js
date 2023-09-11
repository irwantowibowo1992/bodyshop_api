const slugify = require('slugify');
const Product = require('../models/product.model');
const SubCategory = require('../models/subCategory.model');

async function getAllProduct() {
  return Product.find().populate({
    path: 'category',
    select: '_id name',
  });
}

async function addNewProduct(data) {
  const category = await getItemAndSubCategories(data.subCategory);
  // console.log(category.category._id.toString());
  // return console.log(category.category.itemCategory._id.toString());
  let dataToInsert = {
    name: data.name,
    sku: generateSKU(data.name, category.name),
    description: data.description,
    slug: slugify(data.name, {
      replacement: '-',
      lower: true,
      trim: true,
    }),
    price: data.price,
    itemCategory: category.category.itemCategory._id.toString(),
    category: category.category._id.toString(),
    subCategory: data.subCategory,
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

async function getItemAndSubCategories(subCategory) {
  const data = await SubCategory.findOne({ _id: subCategory }).populate({
    path: 'category',
    select: '_id name',
    populate: {
      path: 'itemCategory',
      select: '_id name',
    },
  });

  return data;
}

function generateSKU(productName, subCategory) {
  // Generate a random number between 1000 and 9999
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;

  // Remove any spaces from the product name and convert it to lowercase
  const formattedProductName = productName.replace(/\s/g, '').toLowerCase();
  const formattedSubCategoryName = subCategory.replace(/\s/g, '').toLowerCase();

  // Combine the product attributes and the random number to form the SKU
  const sku = `${formattedProductName}-${formattedSubCategoryName}-${randomNumber}`;

  return sku;
}

module.exports = {
  getAllProduct,
  addNewProduct,
  getDetailProduct,
};
