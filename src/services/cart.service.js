const db = require("../models/index.js");

const { product: Product, cart: Cart } = db;

exports.addToCart = async (userId, productId, quantity = 1) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [],
      total: 0,
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId.toString()
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity,
      price: product.price,
    });
  }

  cart.total = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return await cart.save();
};
