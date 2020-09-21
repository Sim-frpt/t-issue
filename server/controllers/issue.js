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
exports.create = async (req, res, next) => {
  debug(req.file);
  debug(req.body);
  const errors = validationResult(req);
  debug(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const imageName = req.file.filename ? req.file.filename : 'issue-default.png';
  const assigneeId = req.body.assignee_id ? parseInt(req.body.assignee_id) : null;

  const issue = {
    title: req.body.title,
    description: req.body.description,
    image: imageName,
    tagId: parseInt(req.body.tag_id),
    assigneeId: assigneeId,
    creatorId: parseInt(req.body.creator_id),
    priorityId: parseInt(req.body.priority_id),
    projectId: parseInt(req.body.project_id),
    statusId: parseInt(req.body.status_id)
  };

  try {
    const result = await Issue.create(issue);

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

/*
  @desc Get single issue
  @route GET /api/issues/:id
*/
exports.show = async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (issue === null) {
      const error = new Error('Issue not found');
      error.status = 404;

      return next(error);
    }

    return res.json(issue);
  } catch (err) {
    next(err);
  }
};

/*
  @desc Get issue edit form
  @route GET /api/issues/edit
*/
exports.edit = async (req, res, next) => {
  try {
    const currentIssue = await Issue.findById(req.params.id);

    if (currentIssue === null) {
      const error = new Error('Issue not found');
      error.status = 404;

      return next(error);
    }

    if (req.user.user_id !== currentIssue.creator_id) {
      const error = new Error('Forbidden');
      error.status = 403;

      return next(error);
    }

    return res.json(currentIssue);
  } catch (err) {
    next(err);
  }
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

