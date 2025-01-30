const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const route = express.Router();

route.post("/create-product", createProduct);
route.get("/get-product", getProducts);
route.get("/:id", getProduct);
route.put("/:id", updateProduct);
route.delete("/:id", deleteProduct);

module.exports = { route };
