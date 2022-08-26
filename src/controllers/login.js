const loginService = require('../services/login');

const loginRequest = async (req, res) => {
  const token = await loginService.loginRequest(req);
  res.status(200).json({ token });
};

module.exports = {
  loginRequest,
};