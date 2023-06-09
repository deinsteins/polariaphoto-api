const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createBooking(productId, userId, bookingDate) {
  const booking = await prisma.booking.create({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: userId } },
      bookingDate: bookingDate,
    },
  });

  return booking;
}

async function getBookingById(id) {
    return prisma.booking.findUnique({ where: { id } });
}

async function getAllBookings() {
    return prisma.booking.findMany();
  }

async function updateBooking(id, data) {
    return prisma.booking.update({ where: { id }, data });
}

async function deleteBooking(id) {
    return prisma.booking.delete({ where: { id } });
}

module.exports = {
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
  getAllBookings,
};
