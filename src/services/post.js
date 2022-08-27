const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const { tokenInfos } = require('../../util');

const createNewPost = async ({ title, content, authorization, categoryIds }) => {
  const { id: userId } = jwt.verify(authorization, tokenInfos.secret);
  const newPost = await BlogPost.create({ title, content, userId });
  const { id: postId } = newPost;
  categoryIds.forEach(async (categoryId) => {
    await PostCategory.create({ categoryId, postId });
  });
  return newPost;
};

const getAllPost = async () => {
  const allPost = await BlogPost
    .findAll({ include: [
      {
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
      },
      {
        model: Category,
        as: 'categories',
        through: {
          attributes: [],
        },
      },
    ] });
  return allPost;
};

module.exports = {
  createNewPost,
  getAllPost,
};