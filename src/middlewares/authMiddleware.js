const fastifyJwt = require("fastify-jwt");
const { getUserById, getUserByEmail } = require("../models/userModel");
const { verifyToken } = require("../utils/jwtUtil");

module.exports = 
  async function authenticate(request, reply) {
    try {
      const token = request.headers.authorization;
      // Verify the JWT token
      const decodedToken = await verifyToken(token);
      // Get the user ID from the token payload
      const email = decodedToken;
      // Get the user by ID from the database
      const user = await getUserByEmail(email);
      request.user = user;
    } catch (error) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  }

