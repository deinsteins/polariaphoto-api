const {
    createBooking,
    getAllBookings,
    updateBooking,
    deleteBooking,
    getBookingById,

  } = require('../models/bookingModel');
  
  async function createBookingHandler(request, reply) {
    const { id } = request.params;
    const { id: userId } = request.user;
    const { bookingDate } = request.body;
  
    try {
      // Call the createBooking function to create a new booking
      const booking = await createBooking(Number(id), userId, bookingDate);
  
      reply.status(201).send(booking);
    } catch (error) {
      reply.status(500).send({ error: error.meta.cause });
    }
  }

// Get all booking data
async function getAllBookingsHandler(request, reply) {
    const { role } = request.user;
    if (role !== "admin") {
      reply.code(403).send({ error: "Access denied" });
      return;
    }

    try {
      const bookings = await getAllBookings();
      reply.send(bookings);
    } catch (error) {
      reply.status(500).send({ error: error });
    }
  }

 // Get Booking By ID
 async function getBookingByIdHandler(request, reply) {
    const { id } = request.params;
    const { role } = request.user;
    if (role !== "admin") {
      reply.code(403).send({ error: "Access denied" });
      return;
    }

    try {
      const booking = await getBookingById(Number(id));
      reply.send(booking);
    } catch (error) {
      reply.status(500).send({ error: error.meta.cause });
    }
  }
  
  // Update a Booking
  async function updateBookingByIdHandler(request, reply) {
    const { id } = request.params;
 
    try {
      const booking = await updateBooking(Number(id), request.body);
      reply.send(booking);
    } catch (error) {
      reply.status(500).send({ error: error.meta.cause });
    }
  }
  
  // Delete a Booking
  async function deleteBookingByIdHandler(request, reply) {
    const { id } = request.params;
   
    try {
      await deleteBooking(Number(id));
      reply.send({ message: 'Booking deleted successfully' });
    } catch (error) {
      reply.status(500).send({ error: error.meta.cause });
    }
  }
  
  module.exports = {
    createBookingHandler,
    getAllBookingsHandler,
    getBookingByIdHandler,
    updateBookingByIdHandler,
    deleteBookingByIdHandler
  };
  