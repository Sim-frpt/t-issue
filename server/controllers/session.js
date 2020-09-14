const debug = require('debug')('t-issue:sessionController');
const passport = require('passport');

exports.show = async (req, res, next) => {

  if (!req.user) {
    const error = new Error('No active session');
    error.status = 404;

    next(error);
  }

  res.json(req.user);
};

exports.new = async (req, res, next) => {
  // TODO get for login page
  res.json('hello from new session');
};

exports.create = async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      const error = new Error(info.message);
      error.status = 401;

      return next(error);
    }

    req.logIn(user, err => {
      if (err) {
        return next(err);
      }

      res.json(req.user);
    });
  })(req, res, next);
};

exports.destroy = async (req, res, next) => {
  if (!req.user) {
    const error = new Error('No active session');
    error.status = 404;

    return next(error);
  }

  req.logout();
  res.status(200).json('Session destroyed');
};
