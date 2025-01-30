const db = require("../models/index.js");

const { product: Product, order: Order, cart: Cart } = db;

exports.processCheckout = async (userId, cartId) => {
  const cart = await Cart.findOne({ _id: cartId, user: userId }).populate(
    "items.product"
  );

  if (!cart) throw new Error("Cart not found");
  if (cart.items.length === 0) throw new Error("Cart is empty");

  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.price,
  }));

  const order = new Order({
    user: userId,
    items: orderItems,
    total: cart.total,
  });

  const bulkOps = cart.items.map((item) => ({
    updateOne: {
      filter: { _id: item.product._id },
      update: { $inc: { soldCount: item.quantity } },
    },
  }));

  await Product.bulkWrite(bulkOps);

  await Cart.findByIdAndDelete(cartId);

  return await order.save();
};
