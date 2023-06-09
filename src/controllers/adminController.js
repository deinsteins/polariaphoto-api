const { getAllUsers } = require("../models/userModel");

async function getAllUsersHandler(request, reply) {
    const { role } = request.user;
    if (role !== "admin") {
      reply.code(403).send({ error: "Access denied" });
      return;
    }

    try {
      const users = await getAllUsers();
      reply.send(users);
    } catch (error) {
      reply.code(500).send({ error: error.meta.cause });
    }
  }

module.exports = { getAllUsersHandler };
