const errorHandler = (err, _req, res, next) => {
  console.log(err);
  const { message } = err;
  if (message === 'invalid signature' || message === 'jwt malformed') {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  res.status(500).json({ message: 'Erro no servidor!' });
  next(err);
};

module.exports = {
  errorHandler,
};