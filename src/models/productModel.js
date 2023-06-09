const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create a new product
async function createProduct(data) {
  return prisma.product.create({ data });
}

// Get a product by ID
async function getProductById(id) {
  return prisma.product.findUnique({ where: { id } });
}

// Get all products
async function getAllProducts() {
  return prisma.product.findMany();
}

// Update a product
async function updateProduct(id, data) {
  const product = await prisma.product.update({
    where: { id: Number(id) },
    data,
  });

  return product;
}
// Delete a product
async function deleteProduct(id) {
  return prisma.product.delete({ where: { id } });
}

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
