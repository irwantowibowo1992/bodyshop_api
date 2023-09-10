const NotFoundError = require('../exceptions/unauthorized.exception');
const User = require('../models/user.model');
const Address = require('../models/address.model');

async function getProfile(user) {
  const data = await User.findOne({
    _id: user.id,
  });

  return data;
}

async function updateProfile(user, data) {
  const checkUser = await User.findOne({ _id: user.id });

  if (!checkUser) {
    throw new NotFoundError('User tidak ditemukan');
  }

  await User.findByIdAndUpdate(user.id, {
    name: data.name,
  });

  if (data.address) {
    await handleAddress(user, data.address);
  }
}

async function handleAddress(user, data) {
  if (data.id) {
    await Address.findByIdAndUpdate(element.id, {
      user: user.id,
      address_line: element.address_line,
      city: element.city,
      postal_code: element.postal_code,
      country: element.country,
      telephone: element.telephone,
    });
  } else {
    const newAddress = await Address.create({
      user: user.id,
      address_line: data.address_line,
      city: data.city,
      postal_code: data.postal_code,
      country: data.country,
      telephone: data.telephone,
    });

    await User.findByIdAndUpdate(user.id, {
      address: newAddress._id.toString(),
    });
  }
}

module.exports = {
  getProfile,
  updateProfile,
};
