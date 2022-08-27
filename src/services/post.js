const jwt = require('jsonwebtoken');
const { BlogPost, PostCategory } = require('../database/models');
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

module.exports = {
  createNewPost,
};