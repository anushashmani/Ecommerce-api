const { processCheckout } = require("../services/checkout.service");

exports.checkout = async (req, res) => {
  try {
    const { cartId } = req.body;

    const order = await processCheckout(req.user._id, cartId);

    res.json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
