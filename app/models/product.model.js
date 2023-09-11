const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: 3,
      maxLength: 100,
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      minLength: 6,
    },
    price: {
      type: String,
      required: [true, 'Slug is required'],
      minLength: 6,
    },
    itemCategory: {
      type: Schema.Types.ObjectID,
      required: [true, 'Item category is required'],
      ref: 'ItemCategory',
    },
    category: {
      type: Schema.Types.ObjectID,
      required: [true, 'Category is required'],
      ref: 'Category',
    },
    subCategory: {
      type: Schema.Types.ObjectID,
      required: [true, 'Subcategory is required'],
      ref: 'SubCategory',
    },
    productImages: [
      {
        url: {
          type: String,
          required: true,
        },
        isMainImage: {
          type: Boolean,
          default: false,
        },
      },
    ],
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model('Product', productSchema);
