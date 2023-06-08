const { createProduct, getProductById, getAllProducts, updateProduct, deleteProduct } = require('../models/productModel');

async function productRoutes(fastify, options, done) {
  // Create a new product
  fastify.post('/products', async (request, reply) => {
    try {
      const product = await createProduct(request.body);
      reply.code(201).send(product);
    } catch (error) {
      reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // Get a product by ID
  fastify.get('/products/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const product = await getProductById(Number(id));
      if (!product) {
        reply.code(404).send({ error: 'Product not found' });
        return;
      }
      reply.send(product);
    } catch (error) {
      reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // Get all products
  fastify.get('/products', async (request, reply) => {
    try {
      const products = await getAllProducts();
      reply.send(products);
    } catch (error) {
      reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // Update a product
  fastify.put('/products/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const product = await updateProduct(Number(id), request.body);
      reply.send(product);
    } catch (error) {
      reply.code(500).send({ error: 'Internal server error' });
    }
  });

  // Delete a product
  fastify.delete('/products/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      await deleteProduct(Number(id));
      reply.send({ message: 'Product deleted successfully' });
    } catch (error) {
      reply.code(500).send({ error: 'Internal server error' });
    }
  });

  done();
}

module.exports = productRoutes;
