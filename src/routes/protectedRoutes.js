const fastifyJwt = require("fastify-jwt");
const { getUserById } = require("../models/userModel");

module.exports = function (fastify, opts, done) {
  fastify.register(fastifyJwt, {
    secret: "your-secret-key", // Replace with your own secret key
  });

  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.status(401).send({ error: "Unauthorized" });
    }
  });

  fastify.addHook("preHandler", fastify.authenticate);

  // Rest of your code

  done();
};
