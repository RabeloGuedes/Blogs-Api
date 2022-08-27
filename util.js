const rescue = (action) => async (req, res, next) => {
  try {
    await action(req, res, next);
  } catch (err) {
    next(err);
  }
};

const stautsCode = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  conflict: 409,
  internalServerError: 500,
};

const tokenInfos = {
  secret: 'secretJWT',
  config: {
    algorithm: 'HS256',
    expiresIn: '1d',
  },
};

module.exports = {
  rescue,
  stautsCode,
  tokenInfos,
};