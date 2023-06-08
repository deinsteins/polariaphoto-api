const { createUser, getUserByEmail } = require("../models/userModel");
const { hashPassword, comparePasswords } = require("../services/authService");
const { generateToken } = require("../utils/jwtUtil");

async function registerUser(email, password, phone, role) {
  try {
    // Check if the user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);
    const userRole = role? role : "user";

    // Create a new user
    const newUser = await createUser({ email, password: hashedPassword, phone,  role: userRole});

    // Generate JWT token
    const token = generateToken({ email: newUser.email });

    return token;
  } catch (error) {
    throw new Error("Registration failed");
  }
}

async function loginUser(email, password) {
  try {
    // Get the user by email
    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Compare passwords
    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = generateToken({ email });

    return token;
  } catch (error) {
    throw new Error("Login failed");
  }
}

module.exports = {
  registerUser,
  loginUser,
};
