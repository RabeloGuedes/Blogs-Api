const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const loginRequest = async (req) => {
  const { body } = req;
  const { email, password } = body;
  const { id } = await User.findOne({ where: { email, password } });
  const SECRET = 'secretJWT';
  const tokenConfig = {
    algorithm: 'HS256',
    expiresIn: '1d',
  };
  const token = jwt.sign({ id }, SECRET, tokenConfig);
  req.userId = token;
  return token;
};

module.exports = {
  loginRequest,
};