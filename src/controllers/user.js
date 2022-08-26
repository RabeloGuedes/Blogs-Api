const userService = require('../services/user');

const createNewUser = async (req, res) => {
  const token = await userService.createNewUser(req);
  res.status(201).json({ token });
};

module.exports = {
  createNewUser,
};