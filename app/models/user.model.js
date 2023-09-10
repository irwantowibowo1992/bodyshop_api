const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { model, Schema } = mongoose;

let userSchema = Schema(
  {
    name: {
      type: String,
      // required: [true, 'Name is required'],
      minLength: 3,
      maxLength: 100,
    },
    email: {
      type: String,
      unique: true,
      // required: [true, 'Email is required'],
    },
    password: {
      type: String,
      // required: [true, 'Password is required'],
      minLength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    address: {
      type: Schema.Types.ObjectID,
      ref: 'Address',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bcrypt.hash(User.password, 12);
  }

  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = model('User', userSchema);
