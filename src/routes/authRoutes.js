const { registerHandler, loginHandler } = require('../controllers/authController');

module.exports = function (fastify, opts, done) {
  fastify.post("/register", registerHandler);
  fastify.post("/login", loginHandler);

  done();
};
