const { addProductHandler, getProductHandler, getAllProductsHandler, updateProductByIdHandler, deleteProductByIdHandler, createBookingHandler } = require('../controllers/productController');

module.exports = function (fastify, opts, done) {
  fastify.get("/products", getAllProductsHandler);
  fastify.get("/products/:id", getProductHandler);
  fastify.post("/products", addProductHandler);
  fastify.put("/products/:id", updateProductByIdHandler);
  fastify.delete("/products/:id", deleteProductByIdHandler);
  fastify.post("/products/:id/book", createBookingHandler);

  done();
};