const { createUser, getUserByEmail } = require("../models/userModel");
const { hashPassword, comparePasswords } = require("../services/authService");
const { generateToken } = require("../utils/jwtUtil");

async function registerHandler(request, reply) {
  try {
    const { email, password, name, phone, role } = request.body;

    // Check if the user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      reply.code(400).send({ error: "User already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);
    const userRole = role ? role : "user";

    // Create a new user
    const newUser = await createUser({
      email,
      password: hashedPassword,
      name,
      phone,
      role: userRole,
    });

    // Generate JWT token
    const token = generateToken({ email: newUser.email });

    reply.send({ token });
  } catch (error) {
    console.log(error);
    reply.code(500).send({ error: error.message });
  }
}

async function loginHandler(request, reply) {
  try {
    const { email, password } = request.body;

    // Get the user by email
    const user = await getUserByEmail(email);
    if (!user) {
      reply.code(400).send({ error: "Invalid credentials" });
      return;
    }

    // Compare passwords
    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      reply.code(400).send({ error: "Invalid credentials" });
      return;
    }

    // Generate JWT token
    const token = generateToken(user.email);

    reply.send({ token, role: user.role });
  } catch (error) {
    reply.code(500).send({ error: error.meta.cause });
  }
}

module.exports = { loginHandler, registerHandler };
