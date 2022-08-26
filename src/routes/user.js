const express = require('express');

const {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
} = require('../middlewares/validations');

const userController = require('../controllers/user');

const userRoute = express.Router();

userRoute.post('/',
isDisplayNameValid,
isEmailValid,
isPasswordValid,
userController.createNewUser);

module.exports = userRoute;