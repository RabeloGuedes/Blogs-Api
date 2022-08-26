const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const { tokenInfos } = require('../../util');

const createNewUser = async (req) => {
  const { body: { displayName, email, password, image } } = req;
  const { id } = User.create({ displayName, email, password, image });
  const token = jwt.sign({ id }, tokenInfos.secret, tokenInfos.config);
  req.userId = token;
  return token;
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  return allUsers;
};

module.exports = {
  createNewUser,
  getAllUsers,
};
