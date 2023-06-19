const authenticate = require("../middlewares/authMiddleware");
const {
  createBookingHandler,
  getAllBookingsHandler,
  updateBookingByIdHandler,
  deleteBookingByIdHandler,
  getBookingByIdHandler,
  uploadProofOfPaymentHandler,
  getBookingsByUserIdHandler,
} = require("../controllers/bookingController");

module.exports = function (fastify, opts, done) {
  fastify.post(
    "/products/:id/book",
    { preHandler: authenticate },
    (request, reply) => {
      createBookingHandler(request, reply);
    }
  );

  fastify.get("/book", { preHandler: authenticate }, (request, reply) => {
    getAllBookingsHandler(request, reply);
  });

  fastify.get("/book/:id", { preHandler: authenticate }, (request, reply) => {
    getBookingByIdHandler(request, reply);
  });

  fastify.put("/book/:id", { preHandler: authenticate }, (request, reply) => {
    updateBookingByIdHandler(request, reply);
  });

  fastify.put(
    "/book/:id/upload",
    { preHandler: authenticate },
    (request, reply) => {
      uploadProofOfPaymentHandler(request, reply);
    }
  );

  fastify.delete(
    "/book/:id",
    { preHandler: authenticate },
    (request, reply) => {
      deleteBookingByIdHandler(request, reply);
    }
  );

  fastify.get(
    "/book/user/:userId",
    { preHandler: authenticate },
    (request, reply) => {
      getBookingsByUserIdHandler(request, reply);
    }
  );

  done();
};
