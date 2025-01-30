const db = require("../models/index.js");

const { product: Product } = db;

exports.createProduct = async (productData) => {
  try {
    return await Product.create(productData);
  } catch (error) {
    throw error;
  }
};

exports.getAllProducts = async (queryParams) => {
  const { sort } = queryParams;
  let sortOptions = {};

  if (sort === "price_asc") {
    sortOptions = { price: 1 };
  } else if (sort === "price_desc") {
    sortOptions = { price: -1 };
  }

  return await Product.find({}).sort(sortOptions);
};

exports.getProductById = async (id) => {
  try {
    return await Product.findById(id);
  } catch (error) {
    throw error;
  }
};

exports.updateProduct = async (id, updateData) => {
  try {
    return await Product.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw error;
  }
};

exports.deleteProduct = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
