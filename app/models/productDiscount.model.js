const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let productDiscountSchema = Schema(
  {
    product: {
      type: Schema.Types.ObjectID,
      required: [true, 'Subcategory is required'],
      ref: 'Product',
    },
    discount: {
      type: Number,
      required: [true, 'Discount is required'],
    },
    discount_type: {
      type: String,
      enum: ['percent', 'price'],
      default: 'percent',
    },
    valid_from: {
      type: Date,
      required: [true, 'Valid from is required'],
    },
    valid_to: {
      type: Date,
      required: [true, 'Valid from is required'],
    },
  },
  { timestamps: true }
);

module.exports = model('ProductDiscount', productDiscountSchema);
