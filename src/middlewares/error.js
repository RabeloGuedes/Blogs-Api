const { stautsCode } = require('../../util');

const errorHandler = (err, _req, res, next) => {
  console.log(err);
  const { message } = err;
  if (message === 'invalid signature' || message === 'jwt malformed') {
    return res.status(stautsCode.unauthorized).json({ message: 'Expired or invalid token' });
  }
  res.status(stautsCode.internalServerError).json({ message: 'Erro no servidor!' });
  next(err);
};

module.exports = {
  errorHandler,
};