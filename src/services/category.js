const { Category } = require('../database/models');

const createNewCategory = async ({ name }) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

module.exports = {
  createNewCategory,
  getAllCategories,
};