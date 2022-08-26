const express = require('express');

// const { loginValidation } = require('../middlewares/validations');

const userController = require('../controllers/user');

const userRoute = express.Router();

userRoute.post('/', userController.createNewUser);

module.exports = userRoute;