const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    min: [1, "Quantity can't be less than 1"],
  },
  price: {
    type: Number,
    required: true,
  },
});

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [CartItemSchema],
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", CartSchema);

module.exports = CartModel;
