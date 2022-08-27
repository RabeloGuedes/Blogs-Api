const loginService = require('../services/login');

const { rescue, stautsCode } = require('../../util');

const loginRequest = rescue(async (req, res) => {
  const token = await loginService.loginRequest(req);
  res.status(stautsCode.ok).json({ token });
});

module.exports = {
  loginRequest,
};