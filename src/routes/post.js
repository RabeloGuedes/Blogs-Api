const express = require('express');
const postController = require('../controllers/post');

const {
  isTheTokenValid,
  isThereAToken,
} = require('../middlewares/token');

const postRoute = express.Router();

postRoute.post('/',
isTheTokenValid,
isThereAToken,
postController.createNewPost);

module.exports = postRoute;