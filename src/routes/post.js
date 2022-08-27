const express = require('express');
const postController = require('../controllers/post');

const {
  isTheTokenValid,
  isThereAToken,
} = require('../middlewares/token');

const {
  isThePostValid,
  areTheCategoriesValid,
  isThereAPost,
  isThePostUpdateValid,
  isTheUserAuthorized,
} = require('../middlewares/post');

const postRoute = express.Router();

postRoute.post('/',
isThePostValid,
areTheCategoriesValid,
isThereAToken,
isTheTokenValid,
postController.createNewPost);

postRoute.get('/',
isThereAToken,
isTheTokenValid,
postController.getAllPost);

postRoute.get('/:id',
isThereAToken,
isTheTokenValid,
isThereAPost,
postController.getPostById);

postRoute.put('/:id',
isThereAToken,
isTheTokenValid,
isTheUserAuthorized,
isThePostUpdateValid,
postController.updatePostById);

postRoute.delete('/:id',
isThereAToken,
isTheTokenValid,
isThereAPost,
isTheUserAuthorized,
postController.deletePostById);

module.exports = postRoute;