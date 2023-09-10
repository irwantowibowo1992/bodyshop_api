const { NotBeforeError } = require('jsonwebtoken');
const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const { requestTransaction } = require('../api/tripay.api');
const { generateInvoiceNumber } = require('../utils/string.util');
const NotFoundError = require('../exceptions/notFound.exception');

async function getAllOrders() {
  const options = {
    page: 1,
    limit: 10,
    select: '_id bill invoice payment_method payment_code status',
    populate: {
      path: 'user',
      select: '_id name email',
      populate: {
        path: 'address',
        select: 'address_line city country postal_code telephone',
      },
    },
  };
  const data = await Order.paginate({}, options);
  //   const data = await Order.find(
  //     {},
  //     { createdAt: 0, updatedAt: 0, items: 0, __v: 0 }
  //   ).populate({
  //     path: 'user',
  //     select: '_id name email',
  //   });
  return data;
}

async function checkout(user, payload) {
  const cart = await Cart.findOne({ user: user.id });

  if (!cart) {
    throw new NotBeforeError('Cart tidak ditemukan');
  }

  payload = { ...payload, amount: cart.bill, email: user.email };
  const invoiceNumber = generateInvoiceNumber();

  const dataPayment = {
    invoice: invoiceNumber,
    amount: payload.amount,
    payment_method: payload.transfer_method,
    customer_name: user.name,
    customer_email: user.email,
    customer_phone: user.phone || '087838732012',
    order_items: cart.items,
  };

  const dataOrder = await requestTransaction(dataPayment);

  // harusnya tembak dulu payment gateway baru simpan ke order
  await Promise.all([
    Order.create({
      user: user.id,
      items: cart.items,
      bill: cart.bill,
      invoice: dataOrder.merchant_ref,
      payment_method: dataOrder.payment_name,
      payment_code: dataOrder.pay_code,
      payment_status: dataOrder.status,
    }),

    Cart.findByIdAndDelete({ _id: cart.id }),
  ]);

  return 'success';
}

async function getDetailOrder(id) {
  const data = await Order.findOne({ _id: id }).populate({
    path: 'user',
    select: '_id name email',
    populate: {
      path: 'address',
      select: '_id address_line postal_code city country telephone',
    },
  });

  if (!data) {
    throw new NotFoundError('Data order tidak ditemukan');
  }

  return data;
}

async function notification(data) {
  console.log(data);
  const checkOrder = await Order.findOne({ invoice: data.merchant_ref });

  if (!checkOrder) {
    throw new NotFoundError('Order tidak ditemukan');
  }

  checkOrder.payment_status = data.status;
  checkOrder.updatedAt = new Date();
  await checkOrder.save();

  return 'success';
}

module.exports = {
  getAllOrders,
  checkout,
  notification,
  getDetailOrder,
};
