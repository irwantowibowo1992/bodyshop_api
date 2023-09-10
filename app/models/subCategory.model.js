const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let subCategorySchema = Schema(
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
    category: {
      type: Schema.Types.ObjectID,
      required: [true, 'Category is required'],
      ref: 'Category',
    },
  },
  { timestamps: true }
);

module.exports = model('SubCategory', subCategorySchema);
