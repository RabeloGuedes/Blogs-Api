const { rescue, stautsCode } = require('../../util');

const isThereACategory = rescue(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(stautsCode.badRequest).json({
      message: '"name" is required',
    });
  } next();
});

module.exports = {
  isThereACategory,
};