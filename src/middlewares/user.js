const { User } = require('../database/models');
const { rescue, stautsCode } = require('../../util');

const isDisplayNameValid = rescue(async (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(stautsCode.badRequest).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  } next();
});

const isEmailValid = rescue(async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(email)) {
    return res.status(stautsCode.badRequest).json({
      message: '"email" must be a valid email',
    });
  } next();
});

const isPasswordValid = rescue(async (req, res, next) => {
  const { password } = req.body;
  if (password.length < 6) {
    return res.status(stautsCode.badRequest).json({
      message: '"password" length must be at least 6 characters long',
    });
  } next();
});

const isTheEmailAlreadyRegistred = rescue(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(stautsCode.conflict).json({
      message: 'User already registered',
    });
  } next();
});

const isThereAUser = rescue(async (req, res, next) => {
  const { params: { id } } = req;
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return res.status(stautsCode.notFound).json({
      message: 'User does not exist',
    });
  } next();
});

module.exports = {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
  isTheEmailAlreadyRegistred,
  isThereAUser,
};
