const jwt = require('jsonwebtoken');
const { rescue, stautsCode } = require('../../util');
const { tokenInfos } = require('../../util');

const isThereAToken = rescue(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(stautsCode.unauthorized).json({
      message: 'Token not found',
    });
  } next();
});

const isTheTokenValid = rescue(async (req, _res, next) => {
  const { authorization } = req.headers;
  jwt.verify(authorization, tokenInfos.secret);
  next(); 
});

module.exports = {
  isThereAToken,
  isTheTokenValid,
};
