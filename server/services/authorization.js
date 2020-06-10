exports.isAdmin = (req, res, next) => {

  if (req.user.role !== 'admin') {
    const error = new Error('forbidden');
    error.status = 403;

    return next(error);
  }

  next();
}

