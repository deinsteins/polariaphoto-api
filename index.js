const fastify = require("fastify")();
const dotenv = require("dotenv");
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const adminRoutes = require("./src/routes/adminRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");

// Load environment variables from .env file
dotenv.config();

fastify.register(require('@fastify/cors'), (instance) => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: true
    };

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions)
  }
})

fastify.register(require('fastify-multipart'), { attachFieldsToBody: 'keyValues' });

// Register routes
fastify.register(authRoutes);
fastify.register(adminRoutes);
fastify.register(productRoutes);
fastify.register(bookingRoutes);
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
