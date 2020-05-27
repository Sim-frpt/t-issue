// Models
const User = require.main.require('./db/models/user');

const debug = require('debug')('t-issue:userController');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;


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
exports.create = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(errors);
  }

  try {
    const password = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = password;
  } catch (err) {
    next(err);
  }

  if (!req.body.roleId) {
    req.body.roleId = 1;
  }

  try {
    const result = await User.create(
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.password,
      req.body.roleId
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
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
exports.edit = async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.params.id);

    if (currentUser == null) {
      const error = new Error('User not found');
      error.status = 404;

      next(error);
    }

    return res.json(currentUser);
  } catch (err) {
    next(err);
  }
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

