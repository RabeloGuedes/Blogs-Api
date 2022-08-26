const loginService = require('../services/login');

const { stautsCode } = require('../../util');

const loginRequest = async (req, res) => {
  const token = await loginService.loginRequest(req);
  res.status(stautsCode.ok).json({ token });
};

module.exports = {
  loginRequest,
};