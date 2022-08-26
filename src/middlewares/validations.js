const { User } = require('../database/models');
const { rescue } = require('../../util');

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

module.exports = {
  loginValidation,
  isLoginValid,
};
