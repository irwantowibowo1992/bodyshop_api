const slugify = require('slugify');
const Product = require('../models/product.model');
const SubCategory = require('../models/subCategory.model');
const Paginate = require('../utils/paginate.util');

async function getAllProduct(query) {
  const filter = {};
  filter.price = {
    $gte: query.priceFrom || 0,
  };

  if (query.priceFrom) {
    filter.price.$gte = parseInt(query.priceFrom);
  }

  if (query.priceTo) {
    filter.price.$lte = parseInt(query.priceTo);
  }

  Object.keys(filter).forEach(
    (key) => filter[key] === undefined && delete filter[key]
  );

  const dataFilter = filter ? filter : {};

  const options = {
    page: query.page || 1,
    limit: query.size || 2,
    populate: {
      path: 'category',
      select: '_id name',
    },
  };

  const agregatePipeline = [
    {
      $lookup: {
        from: 'productreviews',
        let: { productId: '$_id' },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ['$product', '$$productId'] }, // Pencocokan dengan _id ItemCategory
            },
          },
          {
            $lookup: {
              from: 'users', // Nama koleksi 'users' di database
              localField: 'user',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $project: {
              review: 1,
              rating: 1,
              'user.name': 1,
              'user.email': 1,
            },
          },
        ],
        as: 'rating',
      },
    },
    {
      $addFields: {
        averageRating: {
          $round: [
            {
              $ifNull: [{ $avg: '$rating.rating' }, 0],
            },
            1, // satu angka di belakang koma
          ],
        },
      },
    },
    {
      $match: dataFilter,
    },
  ];

  const agregateResults = await Product.aggregate(agregatePipeline);

  return new Paginate(agregateResults, options.page, options.limit).process();
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
    weight: data.weight,
  };

  const images = [];
  for (const element of data.images) {
    images.push({
      url: element.url,
      isMainImage: element.isMainImage || false,
    });
  }
  dataToInsert.productImages = images;

  return Product.create(dataToInsert);
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

// function getPagination(page, size) {
//   const limit = size ? +size : 3;
//   const offset = page ? page * limit : 0;

//   return { limit, offset };
// }

module.exports = {
  getAllProduct,
  addNewProduct,
  getDetailProduct,
};
