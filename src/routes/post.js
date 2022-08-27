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

module.exports = postRoute;