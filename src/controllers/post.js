const { rescue, stautsCode } = require('../../util');
const postService = require('../services/post');

const createNewPost = rescue(async (req, res) => {
  const { body } = req;
  const { authorization } = req.headers;
  body.authorization = authorization;
  const newPost = await postService.createNewPost(body);
  res.status(stautsCode.created).json(newPost);
});

const getAllPost = rescue(async (_req, res) => {
  const allPost = await postService.getAllPost();
  res.status(stautsCode.ok).json(allPost);
});

module.exports = {
  createNewPost,
  getAllPost,
};