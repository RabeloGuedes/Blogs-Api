const userService = require('../services/user');
const { rescue, stautsCode } = require('../../util');

const createNewUser = rescue(async (req, res) => {
  const token = await userService.createNewUser(req);
  res.status(stautsCode.created).json({ token });
});

const getAllUsers = rescue(async (_req, res) => {
  const allUsersInfos = await userService.getAllUsers();
  res.status(stautsCode.ok).json(allUsersInfos);
});

const getUserById = rescue(async (req, res) => {
  const { params } = req;
  const user = await userService.getUserById(params);
  res.status(stautsCode.ok).json(user);
});

const deleteUser = rescue(async (req, res) => {
  const { headers } = req;
  await userService.deleteUserById(headers);
  res.status(stautsCode.noContent).json();
});

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  deleteUser,
};