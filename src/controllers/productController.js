const {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  createBooking
} = require('../models/productModel');

// Create a new product
async function addProductHandler(request, reply) {
  try {
    const { name, price, details } = request.body;
    const product = await createProduct({ name, price, details });
    reply.status(201).send(product);
  } catch (error) {
    reply.status(500).send({ error: error.meta.cause  });
  }
}

// Get a product by ID
async function getProductHandler(request, reply) {
  const { id } = request.params;
  try {
    const product = await getProductById(Number(id));
    if (!product) {
      reply.status(404).send({ error: 'Product not found' });
      return;
    }
    reply.send(product);
  } catch (error) {
    reply.status(500).send({ error: error.meta.cause });
  }
}

// Get all products
async function getAllProductsHandler(request, reply) {
  try {
    const products = await getAllProducts();
    reply.send(products);
  } catch (error) {
    reply.status(500).send({ error: error.meta.cause });
  }
}

// Update a product
async function updateProductByIdHandler(request, reply) {
  const { id } = request.params;
  try {
    const product = await updateProduct(Number(id), request.body);
    reply.send(product);
  } catch (error) {
    reply.status(500).send({ error: error.meta.cause });
  }
}

// Delete a product
async function deleteProductByIdHandler(request, reply) {
  const { id } = request.params;
  try {
    await deleteProduct(Number(id));
    reply.send({ message: 'Product deleted successfully' });
  } catch (error) {
    reply.status(500).send({ error: error.meta.cause });
  }
}

async function createBookingHandler(request, reply) {
  const { id } = request.params;
  const { userId, bookingDate } = request.body;

  try {
    // Call the createBooking function to create a new booking
    const booking = await createBooking(Number(id), userId, bookingDate);

    reply.status(201).send(booking);
  } catch (error) {
    reply.status(500).send({ error: error.meta.cause });
  }
}

module.exports = {
  addProductHandler,
  getProductHandler,
  getAllProductsHandler,
  updateProductByIdHandler,
  deleteProductByIdHandler,
  createBookingHandler
};
