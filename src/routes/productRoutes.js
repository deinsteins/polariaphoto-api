const { addProductHandler, getProductHandler, getAllProductsHandler, updateProductByIdHandler, deleteProductByIdHandler, createBookingHandler } = require('../controllers/productController');
const authenticate = require('../middlewares/authMiddleware');

module.exports = function (fastify, opts, done) {
  fastify.get("/products", getAllProductsHandler);
  fastify.get("/products/:id", getProductHandler);
  fastify.post("/products/:id/book", createBookingHandler);
  
  fastify.post("/products", { preHandler: authenticate}, (request, reply) => {
    addProductHandler(request, reply);
  });
  fastify.put("/products/:id", { preHandler: authenticate}, (request, reply) => {
    updateProductByIdHandler(request, reply);
  });
  fastify.delete("/products/:id", { preHandler: authenticate}, (request, reply) => {
    deleteProductByIdHandler(request, reply);
  });

  done();
};