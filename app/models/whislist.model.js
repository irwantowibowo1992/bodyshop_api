const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let whislistSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectID,
      required: [true, 'User is required'],
      ref: 'User',
    },
    product: {
      type: Schema.Types.ObjectID,
      required: [true, 'Product is required'],
      ref: 'Product',
    },
  },
  { timestamps: true }
);

module.exports = model('Whislist', whislistSchema);
