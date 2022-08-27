const express = require('express');

const {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
  isTheEmailAlreadyRegistred,
  isThereAUser,
} = require('../middlewares/user');
const {
  isThereAToken,
  isTheTokenValid,
} = require('../middlewares/token');

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

userRoute.get('/:id',
isThereAToken,
isTheTokenValid,
isThereAUser,
userController.getUserById);

userRoute.delete('/me',
isThereAToken,
userController.deleteUser);

module.exports = userRoute;