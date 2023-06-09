const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  createUser: async (data) => {
    return prisma.user.create({ data });
  },

  getUserByEmail: async (email) => {
    return prisma.user.findUnique({ where: { email } });
  },

  getUserById: async (id) => {
    return prisma.user.findUnique({ where: { id } });
  },
  
  updateUser: async (id, data) => {
    return prisma.user.update({ where: { id }, data });
  },

  deleteUser: async (id) => {
    return prisma.user.delete({ where: { id } });
  },

  getAllUsers: async () => {
    return prisma.user.findMany();
  },
  
};
