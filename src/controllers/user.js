const userService = require('../services/user');

const createNewUser = async (req, res) => {
  const token = await userService.createNewUser(req);
  res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const allUsersInfos = await userService.getAllUsers();
  res.status(200).json(allUsersInfos);
};

module.exports = {
  createNewUser,
  getAllUsers,
};