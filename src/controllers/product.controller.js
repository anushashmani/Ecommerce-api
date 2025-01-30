const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../services/product.service");

exports.createProduct = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { sort } = req.query;

    const products = await getAllProducts({ sort });
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
