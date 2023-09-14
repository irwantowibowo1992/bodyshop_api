const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { model, Schema } = mongoose;

let productReviewSchema = Schema(
  {
    product: {
      type: Schema.Types.ObjectID,
      required: [true, 'Product is required'],
      ref: 'Product',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    review: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isRecomended: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
  },
  { timestamps: true }
);

productReviewSchema.plugin(mongoosePaginate);

module.exports = model('ProductReview', productReviewSchema);
