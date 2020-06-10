exports.checkAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    const error = new Error('Unauthorized');
    error.status = 401;

    next(error);
  }
};
