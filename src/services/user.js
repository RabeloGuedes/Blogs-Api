const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const SECRET = 'secretJWT';
const TOKEN_CONFIG = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

const createNewUser = async (req) => {
  const { body: { displayName, email, password, image } } = req;
  const { id } = User.create({ displayName, email, password, image });
  const token = jwt.sign({ id }, SECRET, TOKEN_CONFIG);
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
