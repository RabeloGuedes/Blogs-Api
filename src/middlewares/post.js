const { rescue, stautsCode } = require('../../util');
const { Category, BlogPost } = require('../database/models');

const isThePostValid = rescue(async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(stautsCode.badRequest).json({
      message: 'Some required fields are missing',
    });
  } next();
});

const areTheCategoriesValid = rescue(async (req, res, next) => {
  const { categoryIds } = req.body;
  const categoriesCounter = await Category.count({ where: { id: categoryIds } });
  if (categoriesCounter !== categoryIds.length) {
    return res.status(stautsCode.badRequest).json({
      message: '"categoryIds" not found',
    });
  } next();
});

const isThereAPost = rescue(async (req, res, next) => {
  const { id } = req.params;
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) {
    return res.status(stautsCode.notFound).json({
      message: 'Post does not exist',
    });
  } next();
});

module.exports = {
  isThePostValid,
  areTheCategoriesValid,
  isThereAPost,
};