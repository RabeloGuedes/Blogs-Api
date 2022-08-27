const jwt = require('jsonwebtoken');
const { User, BlogPost, PostCategory } = require('../database/models');
const { tokenInfos } = require('../../util');

const createNewUser = async (req) => {
  const { body: { displayName, email, password, image } } = req;
  const { id } = User.create({ displayName, email, password, image });
  const token = jwt.sign({ id }, tokenInfos.secret, tokenInfos.config);
  req.userId = token;
  return token;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  return allUsers;
};

const getUserById = async ({ id }) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  return user;
};

const deleteUserById = async ({ authorization }) => {
  const { id } = jwt.verify(authorization, tokenInfos.secret);
  const blogPosts = await BlogPost.findAll({ where: { userId: id } });
  const blogPostsIds = blogPosts.map((post) => post.id);
  await PostCategory.destroy({ where: { postId: blogPostsIds } });
  await BlogPost.destroy({ where: { userId: id } });
  await User.destroy({ where: { id } });
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  deleteUserById,
};
