const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const NotFoundError = require('../exceptions/notFound.exception');

async function getCart(user) {
  return await Cart.find({
    user: user.id,
  });
}

async function addToCart(user, data) {
  const [cart, item] = await Promise.all([
    Cart.findOne({
      user: user.id,
    }),

    Product.findOne({ _id: data.product_id }),
  ]);

  if (!item) {
    throw new NotFoundError('Product tidak ditemukan');
  }

  const price = item.price;
  const name = item.name;

  if (cart) {
    const itemIndex = cart.items.findIndex(
      (item) => item.itemId.toString() == data.product_id
    );
    //check if product exists or not

    if (itemIndex > -1) {
      let product = cart.items[itemIndex];
      product.quantity += data.quantity;

      cart.bill = cart.items.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);

      cart.items[itemIndex] = product;
      await cart.save();
      return cart;
    } else {
      cart.items.push({
        itemId: data.product_id,
        name,
        quantity: data.quantity,
        price,
      });
      cart.bill = cart.items.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);

      await cart.save();
      return cart;
    }
  } else {
    //no cart exists, create one
    const newCart = await Cart.create({
      user: user.id,
      items: [
        { itemId: data.product_id, name, quantity: data.quantity, price },
      ],
      bill: data.quantity * price,
    });
    return newCart;
  }
}

async function deleteItemCart(id, user) {
  let cart = await Cart.findOne({
    user: user.id,
  });

  const itemIndex = cart.items.findIndex(
    (item) => item.itemId.toString() == id
  );

  if (itemIndex > -1) {
    let item = cart.items[itemIndex];
    cart.bill -= item.quantity * item.price;

    if (cart.bill < 0) {
      cart.bill = 0;
    }
    cart.items.splice(itemIndex, 1);
    cart.bill = cart.items.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);
    cart = await cart.save();
    return cart;
  } else {
    throw new NotFoundError('Item tidak ditemukan');
  }
}

module.exports = {
  getCart,
  addToCart,
  deleteItemCart,
};
