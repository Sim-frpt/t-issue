const { validationResult } = require('express-validator');
const debug = require('debug')('t-issue:issueController');

// Models
const Issue = require.main.require('./db/models/issue');
const Tag = require.main.require('./db/models/tag');
const Priority = require.main.require('./db/models/priority');
const Status = require.main.require('./db/models/status');
const User = require.main.require('./db/models/user');


/*
  @desc Get all Issues
  @route GET /api/issues
*/
exports.index = async (req, res, next) => {
  try {
    const results = await Issue.findAll();

    return res.json(results);
  } catch (err) {
    next(err);
  }
};

/*
  @desc Get issue creation form
  @route GET /api/issues/new
*/
exports.new = async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    const priorities = await Priority.findAll();
    const users = await User.findAll();
    const status = await Status.findAll();

    const results = { tags, priorities, users, status };

    res.json(results);
  } catch (err) {
    next(err);
  }
};

/*
  @desc Create issue
  @route POST /api/issues
*/
exports.create = (req, res, next) => {
  const errors = validationResult(req);
  debug(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  return res.json('hello from issue create');
};

/*
  @desc Get single issue
  @route GET /api/issues/:id
*/
exports.show = (req, res, next) => {
  return res.json('hello from issue show');
};

/*
  @desc Get issue edit form
  @route GET /api/issues/edit
*/
exports.edit = (req, res, next) => {
  return res.json('hello from issue edit');
};

/*
  @desc Update issue
  @route PUT /api/issues/:id
*/
exports.update = (req, res, next) => {
  return res.json('hello from issue update');
};

/*
  @desc Delete Issue
  @route DELETE /api/issues/:id
*/
exports.destroy = (req, res, next) => {
  return res.json('hello from issue destroy');
};

