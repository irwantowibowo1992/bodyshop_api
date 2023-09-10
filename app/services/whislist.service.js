const Whislist = require('../models/whislist.model');

async function getAllWhislist(user) {
  return await Whislist.find({
    user: user.id,
  })
    .populate({
      path: 'user',
      select: '_id name',
    })
    .populate({
      path: 'product',
      select: '_id name price producImage',
    });
}

async function addWhislist(user, data) {
  return Whislist.create({
    user: user.id,
    product: data.product_id,
  });
}

module.exports = {
  getAllWhislist,
  addWhislist,
};
