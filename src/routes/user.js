const express = require('express');

const { loginValidation } = require('../middlewares/validations');

const userRoute = express.Router();

userRoute.get('/', loginValidation);

module.exports = userRoute;