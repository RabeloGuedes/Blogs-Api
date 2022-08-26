const express = require('express');

const {
  isDisplayNameValid,
  isEmailValid,
} = require('../middlewares/validations');

const userController = require('../controllers/user');

const userRoute = express.Router();

userRoute.post('/',
isDisplayNameValid,
isEmailValid,
userController.createNewUser);

module.exports = userRoute;