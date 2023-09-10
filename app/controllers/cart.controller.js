const cartService = require('../services/cart.service');
const SuccessResult = require('../utils/response.util');

async function getCart(req, res) {
  const user = req.user;

  const data = await cartService.getCart(user);
  SuccessResult.make(res).send(data);
}

async function addToCart(req, res) {
  const user = req.user;
  const body = req.body;

  await cartService.addToCart(user, body);
  SuccessResult.make(res).sendMessage('Berhasil memasukkan product ke cart');
}

async function deleteItemCart(req, res) {
  const user = req.user;
  const { id } = req.params;

  await cartService.deleteItemCart(id, user);
  SuccessResult.make(res).sendMessage('Item cart berhasil dihapus');
}

module.exports = {
  addToCart,
  getCart,
  deleteItemCart,
};
