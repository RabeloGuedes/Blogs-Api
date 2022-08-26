const express = require('express');
const categoryController = require('../controllers/category');
const { isThereACategory } = require('../middlewares/category');
const {
  isTheTokenValid,
  isThereAToken,
} = require('../middlewares/token');

const categoryRoute = express.Router();

categoryRoute.post('/',
isThereAToken,
isTheTokenValid,
isThereACategory,
categoryController.createNewCategory);

categoryRoute.get('/',
isThereAToken,
isTheTokenValid,
categoryController.getAllCategories);

module.exports = categoryRoute;