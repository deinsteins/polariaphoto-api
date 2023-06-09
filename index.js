const fastify = require("fastify")();
const dotenv = require("dotenv");
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const authenticate = require('./src/middlewares/authMiddleware');
const adminRoutes = require("./src/routes/adminRoutes");

// Load environment variables from .env file
dotenv.config();

// Register routes
fastify.register(authRoutes);
fastify.register(adminRoutes);
fastify.register(productRoutes);
fastify.get('*', (request, reply) => {
  reply.send({ message: '404 - Not Found' });
});

// Start the server
const start = async () => {
  try {
    await fastify.listen(5000);
    console.log("Server running on port 5000");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
