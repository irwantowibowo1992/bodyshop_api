const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { model, Schema } = mongoose;

let orderSchema = new mongoose.Schema(
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
          ref: 'Item',
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
    invoice: {
      type: String,
      required: [true, 'Invoice number is required'],
    },
    payment_method: {
      type: String,
      required: [true, 'Payment method is required'],
    },
    payment_code: {
      type: String,
      required: [true, 'Payment code is required'],
    },
    payment_status: {
      type: String,
      default: 'UNPAID',
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(mongoosePaginate);

module.exports = model('Order', orderSchema);
