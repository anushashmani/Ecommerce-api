const { addToCart } = require("../services/cart.service");

exports.addToCart = async (req, res) => {
  try {
    const cart = await addToCart(
      req.user._id,
      req.body.productId,
      req.body.quantity || 1
    );

    res.json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
