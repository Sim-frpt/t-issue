// Models
const User = require.main.require('./db/models/user');

const debug = require('debug')('t-issue:userController');
const { validationResult } = require('express-validator');

/*
  @desc Get all users
  @route GET /api/users
*/
exports.index = async (req, res, next) => {
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (err) {
    next(err);
  }
};

/*
  @desc Get user creation form
  @route GET /api/users/new
*/
exports.new = (req, res, next) => {
  return res.json('hello from user new');
};

/*
  @desc Create user
  @route POST /api/users
*/
exports.create = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(errors);
  }

  return res.json('hello from user create');
};

/*
  @desc Get single user
  @route GET /api/users/:id
*/
exports.show = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user == null) {
      const error = new Error('User not found');
      error.status = 404;

      next(error);
    }

    return res.json(user);
  } catch (err) {
    next(err);
  }
};

/*
  @desc Get user edit form
  @route GET /api/users/edit
*/
exports.edit = (req, res, next) => {
  return res.json('hello from user edit');
};

/*
  @desc Update User
  @route PUT /api/users/:id
*/
exports.update = (req, res, next) => {
  return res.json('hello from user update');
};

/*
  @desc Delete User
  @route Delete /api/users/:id
*/
exports.destroy = (req, res, next) => {
  return res.json('hello from user destroy');
};

