exports.checkAuthentication = (req, res, next) => {
  if (req.user) {
    next();
  }

  const error = new Error('Unauthorized');
  error.status = 401;

  next(error);
};
