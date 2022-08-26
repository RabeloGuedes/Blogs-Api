const express = require('express');

const { isDisplayNameValid } = require('../middlewares/validations');

const userController = require('../controllers/user');

const userRoute = express.Router();

userRoute.post('/', isDisplayNameValid, userController.createNewUser);

module.exports = userRoute;