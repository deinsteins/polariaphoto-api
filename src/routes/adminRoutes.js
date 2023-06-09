const { getAllUsersHandler } = require('../controllers/adminController');
const authenticate = require('../middlewares/authMiddleware');

module.exports = function (fastify, opts, done) {
  fastify.get('/users', { preHandler: authenticate }, (request, reply) => {
    getAllUsersHandler(request, reply);
  });
  done();
};
