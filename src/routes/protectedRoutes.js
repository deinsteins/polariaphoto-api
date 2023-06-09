const fastifyJwt = require("fastify-jwt");
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');

module.exports = function (fastify, opts, done) {
  fastify.register(fastifyJwt, {
    secret: secretKey, // Replace with your own secret key
  });

  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      reply.status(401).send({ error: "Unauthorized" });
    }
  });

  fastify.addHook("preHandler", fastify.authenticate);

  done();
};
