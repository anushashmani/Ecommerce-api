const express = require("express");
const { addToCart } = require("../controllers/cart.controller");
const authMiddleware = require("../middleware/middleware");

const route = express.Router();
route.post("/add", authMiddleware, addToCart);

module.exports = { route };
