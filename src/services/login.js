const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const { tokenInfos } = require('../../util');

const loginRequest = async (req) => {
  const { body } = req;
  const { email, password } = body;
  const { id } = await User.findOne({ where: { email, password } });
  const token = jwt.sign({ id }, tokenInfos.secret, tokenInfos.config);
  req.userId = token;
  return token;
};

module.exports = {
  loginRequest,
};