const jwt = require('jsonwebtoken');
const { rescue, stautsCode, tokenInfos } = require('../../util');
const { Category, BlogPost, User } = require('../database/models');

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

const isThePostUpdateValid = rescue(async (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(stautsCode.badRequest).json({
      message: 'Some required fields are missing',
    });
  } next();
});

const isTheUserAuthorized = rescue(async (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;
  const { id: userId } = jwt.verify(authorization, tokenInfos.secret);
  const post = await BlogPost
    .findByPk(id, { include: { model: User, as: 'user', attributes: { exclude: ['password'] } } });
  const { user } = post;
  if (user.id !== userId) {
    return res.status(stautsCode.unauthorized).json({
      message: 'Unauthorized user',
    });
  } next();
});

module.exports = {
  isThePostValid,
  areTheCategoriesValid,
  isThereAPost,
  isThePostUpdateValid,
  isTheUserAuthorized,
};