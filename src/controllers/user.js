const userService = require('../services/user');
const { stautsCode } = require('../../util');

const createNewUser = async (req, res) => {
  const token = await userService.createNewUser(req);
  res.status(stautsCode.created).json({ token });
};

const getAllUsers = async (_req, res) => {
  const allUsersInfos = await userService.getAllUsers();
  res.status(stautsCode.ok).json(allUsersInfos);
};

const getUserById = async (req, res) => {
  const { params } = req;
  const user = await userService.getUserById(params);
  res.status(stautsCode.ok).json(user);
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
};