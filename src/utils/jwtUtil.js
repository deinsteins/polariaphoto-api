const jwt = require("jsonwebtoken");

const secretKey = "your-secret-key"; // Replace with your own secret key

module.exports = {
  generateToken: (payload) => {
    return jwt.sign(payload, secretKey);
  },

  verifyToken: (token) => {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      throw new Error("Invalid token");
    }
  },
};
