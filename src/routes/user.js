const express = require('express');

const {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
  isTheEmailAlreadyRegistred,
} = require('../middlewares/validations');

const userController = require('../controllers/user');

const userRoute = express.Router();

userRoute.post('/',
isDisplayNameValid,
isEmailValid,
isPasswordValid,
isTheEmailAlreadyRegistred,
userController.createNewUser);

module.exports = userRoute;