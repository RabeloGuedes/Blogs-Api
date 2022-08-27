const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const { tokenInfos } = require('../../util');

const TABLE_JOIN = { include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
{ model: Category, as: 'categories', through: { attributes: [] } }] };

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
    .findAll(TABLE_JOIN);
  return allPost;
};

const getPostById = async ({ id }) => {
  const [post] = await BlogPost
    .findAll({ ...TABLE_JOIN,
    where: { id } });
  return post;
};

const updatePostById = async ({ id, title, content }) => {
  const updatedPost = await BlogPost.findByPk(id, TABLE_JOIN);
  await updatedPost.update({ title, content });
  return updatedPost;
};

module.exports = {
  createNewPost,
  getAllPost,
  getPostById,
  updatePostById,
};