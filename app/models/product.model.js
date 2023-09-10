const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const ObjectID = mongoose.Schema.Types.ObjectId;

let productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: 3,
      maxLength: 100,
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
    category: {
      type: Schema.Types.ObjectID,
      required: [true, 'Category is required'],
      ref: 'Category',
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
  },
  { timestamps: true }
);

module.exports = model('Product', productSchema);
