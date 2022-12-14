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

const getPostById = rescue(async (req, res) => {
  const { params } = req;
  const post = await postService.getPostById(params);
  res.status(stautsCode.ok).json(post);
});

const updatePostById = rescue(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  body.id = id;
  const updatedPost = await postService.updatePostById(body);
  res.status(stautsCode.ok).json(updatedPost);
});

const deletePostById = rescue(async (req, res) => {
  const { params } = req;
  await postService.deletePostById(params);
  res.status(stautsCode.noContent).json();
});

const getPostByTerm = rescue(async (req, res) => {
  const { query } = req;
  const posts = await postService.getPostByTerm(query);
  res.status(stautsCode.ok).json(posts);
});

module.exports = {
  createNewPost,
  getAllPost,
  getPostById,
  updatePostById,
  deletePostById,
  getPostByTerm,
};