const mongoose = require("mongoose");
const UserModel = require("./user.model");
const TokenModel = require("./token.model");
const productModel = require("./product.model");
const cartModel = require("./cart.model");
const orderModel = require("./order.model");

const db = {};
db.mongoose = mongoose;
db.user = UserModel;
db.token = TokenModel;
db.product = productModel;
db.cart = cartModel;
db.order = orderModel;
db.product = productModel;

module.exports = db;
