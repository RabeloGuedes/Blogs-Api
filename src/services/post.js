const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const { tokenInfos } = require('../../util');

const TABLE_JOIN = { include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
{ model: Category, as: 'categories', through: { attributes: [] } }] };

const GET_BY_SEARCH_TERM_OPTIONS = (q) => ({
  where: {
    [Op.or]: [
      { title: { [Op.like]: `%${q}%` } },
      { content: { [Op.like]: `%${q}%` } },
    ],
  },
  ...TABLE_JOIN,
});

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

const deletePostById = async ({ id }) => {
  await PostCategory.destroy({ where: { postId: id } });
  await BlogPost.destroy({ where: { id } });
};

const getPostByTerm = async ({ q }) => {
  if (!q) {
    const allPost = await getAllPost();
    return allPost;
  } const posts = await BlogPost.findAll(GET_BY_SEARCH_TERM_OPTIONS(q));
  return posts;
};

module.exports = {
  createNewPost,
  getAllPost,
  getPostById,
  updatePostById,
  deletePostById,
  getPostByTerm,
};