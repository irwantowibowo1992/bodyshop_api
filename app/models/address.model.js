const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectID,
      required: [true, 'User is required'],
      ref: 'User',
    },
    address_line: {
      type: String,
      required: [true, 'Name is required'],
      minLength: 3,
      maxLength: 255,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      postal_code: {
        type: String,
        required: [true, 'Postal code is required'],
      },
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
    },
    telephone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Address', addressSchema);
