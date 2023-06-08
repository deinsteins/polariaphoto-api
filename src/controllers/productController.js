const { createProduct, getProductById, getAllProducts, updateProduct, deleteProduct } = require('../models/productModel');

// Create a new product
async function addProduct(req, res) {
  try {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get a product by ID
async function getProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await getProductById(Number(id));
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get all products
async function getAllProducts(req, res) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Update a product
async function updateProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await updateProduct(Number(id), req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Delete a product
async function deleteProductById(req, res) {
  const { id } = req.params;
  try {
    await deleteProduct(Number(id));
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  addProduct,
  getProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
};
