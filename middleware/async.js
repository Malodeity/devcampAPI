//Focuses on applying the D.R.Y principle. DON'T REPEAT YOURSELF.

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
