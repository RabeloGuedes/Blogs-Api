const express = require('express');

const {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
  isTheEmailAlreadyRegistred,
  isThereAToken,
  isTheTokenValid,
} = require('../middlewares/validations');

const userController = require('../controllers/user');

const userRoute = express.Router();

userRoute.post('/',
isDisplayNameValid,
isEmailValid,
isPasswordValid,
isTheEmailAlreadyRegistred,
userController.createNewUser);

userRoute.get('/',
isThereAToken,
isTheTokenValid,
userController.getAllUsers);

module.exports = userRoute;