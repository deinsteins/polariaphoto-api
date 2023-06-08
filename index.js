const fastify = require("fastify")();
const dotenv = require("dotenv");
const authRoutes = require('./src/routes/authRoutes');
const protectedRoutes = require('./src/routes/protectedRoutes');

// Load environment variables from .env file
dotenv.config();

// Register routes
fastify.register(authRoutes);
fastify.register(protectedRoutes);
fastify.register
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
