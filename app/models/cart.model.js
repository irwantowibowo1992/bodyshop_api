const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectID,
      required: [true, 'Category is required'],
      ref: 'User',
    },
    items: [
      {
        itemId: {
          type: Schema.Types.ObjectID,
          ref: 'Product',
          required: true,
        },
        name: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: Number,
      },
    ],
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Cart', cartSchema);
