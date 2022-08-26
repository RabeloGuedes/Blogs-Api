const { User } = require('../database/models');
const { rescue, stautsCode } = require('../../util');

const loginValidation = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(stautsCode.badRequest).json({
      message: 'Some required fields are missing',
    });
  } next();
});

const isLoginValid = rescue(async (req, res, next) => {
  const { email, password } = req.body;
  const isThereAUser = await User.findOne({ where: { email, password } });
  if (!isThereAUser) return res.status(stautsCode.badRequest).json({ message: 'Invalid fields' });
  next();
});

module.exports = {
  loginValidation,
  isLoginValid,
};
