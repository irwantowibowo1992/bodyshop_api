const orderService = require('../services/order.service');
const SuccessResult = require('../utils/response.util');

async function getAllOrders(req, res) {
  const data = await orderService.getAllOrders();
  SuccessResult.make(res).send(data);
}

async function checkout(req, res) {
  const user = req.user;
  const body = req.body;

  await orderService.checkout(user, body);
  SuccessResult.make(res).sendMessage('Berhasil melakukan order');
}

async function getDetailOrder(req, res) {
  const { id } = req.params;

  const data = await orderService.getDetailOrder(id);
  SuccessResult.make(res).send(data);
}

async function notification(req, res) {
  await orderService.notification(req.body);
}

module.exports = {
  checkout,
  notification,
  getAllOrders,
  getDetailOrder,
};
