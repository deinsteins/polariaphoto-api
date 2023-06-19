const {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getBookingById,
  getBookingsCountByDate,
} = require("../models/bookingModel");

const fs = require("fs");
const { createReadStream, createWriteStream } = require("fs");
const { v4: uuidv4 } = require("uuid");
const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function createBookingHandler(request, reply) {
  const { id } = request.params;
  const { id: userId } = request.user;
  const { bookingDate, paymentStatus, proofOfPayment, location, status } =
    request.body;

  try {
    // Check the existing number of bookings for the given bookingDate
    const existingBookingsCount = await getBookingsCountByDate(bookingDate);

    if (existingBookingsCount >= 2) {
      reply.status(400).send({
        error:
          "Jumlah booking sudah mencapai batas maksimal untuk tanggal tersebut",
      });
      return;
    }

    // Call the createBooking function to create a new booking
    const booking = await createBooking(
      Number(id),
      userId,
      bookingDate,
      proofOfPayment,
      paymentStatus,
      status,
      location
    );

    reply.status(201).send(booking);
  } catch (error) {
    reply.status(500).send({ error: error.message });
  }
}

async function uploadProofOfPaymentHandler(request, reply) {
  const { id } = request.params; // Booking ID
  const proofOfPayment = await request.file();

  try {
    // Generate a unique filename for the proof of payment image
    const filename = `${uuidv4()}.${proofOfPayment.filename.split(".").pop()}`;

    // Create a writable stream to store the file locally
    const storedFile = createWriteStream(`./public/images/${filename}`);

    // Pipe the proof of payment file stream to the stored file stream
    proofOfPayment.file.pipe(storedFile);

    // Wait for the file to finish writing
    await new Promise((resolve, reject) => {
      storedFile.on("finish", resolve);
      storedFile.on("error", reject);
    });

    const file = createReadStream(`./public/images/${filename}`);

    // Upload proof of payment image to Supabase Storage
    const { data, error } = await supabase.storage
      .from("polariaphoto")
      .upload(`proof_of_payment/${filename}`, file, {
        contentType: proofOfPayment.mimetype,
        duplex: "half",
      });
    if (error) {
      throw new Error("Failed to upload proof of payment");
    }

    // Get the URL of the uploaded image
    const proofOfPaymentUrl = supabase.storage
      .from("polariaphoto")
      .getPublicUrl(`proof_of_payment/${filename}`);

    // Update the booking with the proof of payment URL
    const updatedBooking = await updateBooking(Number(id), {
      proofOfPayment: proofOfPaymentUrl.data.publicUrl,
    });
    reply.status(201).send(updatedBooking);
  } catch (error) {
    reply.status(500).send({ error: "Gambar harus diupload" });
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
  const { role } = request.user;
  const { paymentStatus } = request.body;

  try {
    if (paymentStatus && role !== "admin") {
      reply.code(403).send({ error: "Access denied" });
      return;
    }

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
    reply.send({ message: "Booking deleted successfully" });
  } catch (error) {
    reply.status(500).send({ error: error.meta.cause });
  }
}

module.exports = {
  createBookingHandler,
  getAllBookingsHandler,
  getBookingByIdHandler,
  updateBookingByIdHandler,
  deleteBookingByIdHandler,
  uploadProofOfPaymentHandler,
};
