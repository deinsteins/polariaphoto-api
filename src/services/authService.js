const bcrypt = require("bcrypt");

const saltRounds = 10;

module.exports = {
  hashPassword: async (password) => {
    return bcrypt.hash(password, saltRounds);
  },

  comparePasswords: async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },
};
