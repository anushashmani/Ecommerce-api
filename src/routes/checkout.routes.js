const express = require("express");
const route = express.Router();
const { checkout } = require("../controllers/checkout.controller");
const authMiddleware = require("../middleware/middleware");

route.post("/checkout", authMiddleware, checkout);

module.exports = { route };
