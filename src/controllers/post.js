const { rescue, stautsCode } = require('../../util');
const postService = require('../services/post');

const createNewPost = rescue(async (req, res) => {
  const { body } = req;
  const { authorization } = req.headers;
  body.authorization = authorization;
  const newPost = await postService.createNewPost(body);
  res.status(stautsCode.created).json(newPost);
});

module.exports = {
  createNewPost,
};