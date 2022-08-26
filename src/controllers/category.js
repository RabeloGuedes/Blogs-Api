const categoryService = require('../services/category');
const { rescue, stautsCode } = require('../../util');

const createNewCategory = rescue(async (req, res) => {
  const { body } = req;
  const newCategory = await categoryService.createNewCategory(body);
  res.status(stautsCode.created).json(newCategory);
});

module.exports = {
  createNewCategory,
};