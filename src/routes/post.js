const express = require('express');
const postController = require('../controllers/post');

const {
  isTheTokenValid,
  isThereAToken,
} = require('../middlewares/token');

const {
  isThePostValid,
  areTheCategoriesValid,
} = require('../middlewares/post');

const postRoute = express.Router();

postRoute.post('/',
isThePostValid,
areTheCategoriesValid,
isThereAToken,
isTheTokenValid,
postController.createNewPost);

module.exports = postRoute;