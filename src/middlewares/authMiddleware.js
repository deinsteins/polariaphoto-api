const fastifyJwt = require("fastify-jwt");
const { getUserById, getUserByEmail } = require("../models/userModel");
const { verifyToken } = require("../utils/jwtUtil");

module.exports = async function authenticate(request, reply) {
  try {
    const token = request.headers.authorization;

    // Periksa apakah token diawali dengan "Bearer "
    if (token && token.startsWith("Bearer ")) {
      // Ambil hanya nilai token setelah "Bearer "
      const tokenValue = token.substring(7);
      // Verifikasi token JWT
      const decodedToken = await verifyToken(tokenValue);
      // Ambil email dari payload token
      const email = decodedToken;
      // Dapatkan pengguna berdasarkan email dari database
      const user = await getUserByEmail(email);
      request.user = user;
    } else {
      throw new Error("Invalid token format");
    }
  } catch (error) {
    reply.code(401).send({ error: "Unauthorized" });
  }
};
