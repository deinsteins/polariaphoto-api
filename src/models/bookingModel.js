const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Fungsi untuk menghitung jumlah booking berdasarkan tanggal booking
async function getBookingsCountByDate(bookingDate) {
  const bookingsCount = await prisma.booking.count({
    where: {
      bookingDate: bookingDate,
    },
  });

  return bookingsCount;
}

async function createBooking(
  productId,
  userId,
  bookingDate,
  proofOfPayment,
  paymentStatus,
  status,
  location
) {
  // Mengambil informasi nama pengguna (user name)
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
    },
  });

  // Mengambil informasi nama produk (product name)
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      name: true,
    },
  });

  const booking = await prisma.booking.create({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: userId } },
      bookingDate: bookingDate,
      proofOfPayment: proofOfPayment,
      paymentStatus: paymentStatus,
      status: status,
      location: location,
      userName: user.name,
      productName: product.name,
    },
  });

  return booking;
}

async function getBookingById(id) {
  return prisma.booking.findUnique({ where: { id } });
}

async function getBookingsByUserId(userId) {
  return prisma.booking.findMany({
    where: {
      userId: userId,
    },
  });
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
  getBookingsCountByDate,
  getBookingsByUserId,
};
