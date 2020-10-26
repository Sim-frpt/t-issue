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
  // TODO user controller for "GET" creation form?
  return res.json('Nothing to do on requesting new user form?');
};

/*
  @desc Create user
  @route POST /api/users
*/
exports.create = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  let { first_name: firstName, last_name: lastName, email, password, roleId = 1 } = req.body;

  try {
    password = await bcrypt.hash(req.body.password, saltRounds);
  } catch (err) {
    next(err);
  }

  try {
    const result = await User.create(
     firstName,
     lastName,
     email,
     password,
     roleId
    );

    res.status(201).json(result);
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

    if (user === null) {
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
  // TODO
  return res.json('hello from user update');
};

/*
  @desc Delete User
  @route Delete /api/users/:id
*/
exports.destroy = async (req, res, next) => {
  try {
    const userToDel = await User.findById(req.params.id);

    if (userToDel == null) {
      const error = new Error('User not found');
      error.status = 404;

      return next(error);
    }

    const deletedUserId = await User.delete(req.params.id);

    res.json(deletedUserId);
  } catch (err) {
      next(err);
  }
};

exports.projectIndex = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user === null) {
      const error = new Error('User not found');
      error.status = 404;
      next(error);
    }

    const userProjects = await User.getUserProjects(req.params.id);

    res.json(userProjects);
  } catch (err) {
    next(err);
  }
}

