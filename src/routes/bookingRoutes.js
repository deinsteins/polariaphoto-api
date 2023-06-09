const authenticate = require('../middlewares/authMiddleware');
const { createBookingHandler, getAllBookingsHandler, updateBookingByIdHandler, deleteBookingByIdHandler, getBookingByIdHandler } = require('../controllers/bookingController');

module.exports = function (fastify, opts, done) {
    fastify.post("/products/:id/book", { preHandler: authenticate}, (request, reply) => {
        createBookingHandler(request, reply);
      });
    
    fastify.get("/book", { preHandler: authenticate}, (request, reply) => {
        getAllBookingsHandler(request, reply);
    });

    fastify.get("/book/:id", { preHandler: authenticate}, (request, reply) => {
        getBookingByIdHandler(request, reply);
    });

    fastify.put("/book/:id", { preHandler: authenticate}, (request, reply) => {
        updateBookingByIdHandler(request, reply);
    });

    fastify.delete("/book/:id", { preHandler: authenticate}, (request, reply) => {
        deleteBookingByIdHandler(request, reply);
    });

    done();
}