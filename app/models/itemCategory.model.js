const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const slugify = require('slugify');

let itemCategorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: 3,
      maxLength: 50,
    },
    slug: {
      type: String,
      unique: true,
      required: [true, 'Slug is required'],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model('ItemCategory', itemCategorySchema);
