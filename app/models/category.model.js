const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let categorySchema = Schema(
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
    itemCategory: {
      type: Schema.Types.ObjectID,
      required: [true, 'Item category is required'],
      ref: 'ItemCategory',
    },
  },
  { timestamps: true }
);

module.exports = model('Category', categorySchema);
