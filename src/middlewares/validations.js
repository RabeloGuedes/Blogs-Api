const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const { rescue } = require('../../util');

const SECRET = 'secretJWT';

const loginValidation = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  } next();
});

const isLoginValid = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const isThereAUser = await User.findOne({ where: { email, password } });
  if (!isThereAUser) return res.status(400).json({ message: 'Invalid fields' });
  next();
});

const isDisplayNameValid = rescue(async (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  } next();
});

const isEmailValid = rescue(async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  } next();
});

const isPasswordValid = rescue(async (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  } next();
});

const isTheEmailAlreadyRegistred = rescue(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(409).json({
      message: 'User already registered',
    });
  } next();
});

const isThereAToken = rescue(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token not found',
    });
  } next();
});

const isTheTokenValid = rescue(async (req, _res, next) => {
  const { authorization } = req.headers;
  jwt.verify(authorization, SECRET);
  next();
});

module.exports = {
  loginValidation,
  isLoginValid,
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
  isTheEmailAlreadyRegistred,
  isThereAToken,
  isTheTokenValid,
};
