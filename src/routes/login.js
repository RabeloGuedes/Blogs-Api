const express = require('express');

const {
  loginValidation,
  isLoginValid,
} = require('../middlewares/login');

const loginController = require('../controllers/login');

const loginRoute = express.Router();

loginRoute.post('/',
loginValidation,
isLoginValid,
loginController.loginRequest);

module.exports = loginRoute;