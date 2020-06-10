const { validationResult } = require('express-validator');
const debug = require('debug')('t-issue:projectController');
const db = require.main.require('./config/db');

// Models
const Project = require.main.require('./db/models/project');
const User = require.main.require('./db/models/user');

/*
  @desc Get all projects
  @route GET /api/projects
*/
exports.index = async (req, res, next) => {
  try {
    const projects = await Project.findAll();

    return res.json(projects);
  } catch (err) {
    next(err);
  }
};

/*
  @desc Get project creation form
  @route GET /api/projects/new
*/
exports.new = (req, res, next) => {
  return res.json('TODO project new?');
};

/*
  @desc Create project
  @route POST /api/projects
*/
exports.create = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const { name } = req.body;

  try {
    const result = await Project.create(name, req.user.user_id);

    return res.json(result);
  } catch (err) {
    next(err);
  }
};

/*
  @desc Get single project
  @route GET /api/projects/:id
*/
exports.show = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project == null) {
      const error = new Error('Project not found');
      error.status = 404;

      next(error);
    }

    return res.json(project);
  } catch (err) {
    next(err);
  }
};

/*
  @desc Get project edit form
  @route GET /api/projects/edit
*/
exports.edit = async (req, res, next) => {
  try {
    const currentProject = await Project.findById(req.params.id);

    // If logged in user is not the admin of the project
    if (req.user.user_id !== currentProject.admin_id) {
      const error = new Error('Forbidden');
      error.status = 403;

      next(error);
    }

    if (currentProject == null) {
      const error = new Error('Project not found');
      error.status = 404;

      next(error);
    }

    return res.json(currentProject);
  } catch (err) {
    next(err);
  }
};

/*
  @desc Update project
  @route PUT /api/projects/:id
*/
exports.update = async (req, res, next) => {
  // If logged in user is not the admin of the project. Project admin is a hidden form input that has to be parsed to become an int
  if (req.user.user_id !== parseInt(req.body.admin_id)) {
    const error = new Error('Forbidden');
    error.status = 403;

    next(error);
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const { name } = req.body;

  try {
    const currentProject = await Project.findById(req.params.id);

    if (currentProject == null) {
      const error = new Error('Project not found');
      error.status = 404;

      next(error);
    }

    const result = await Project.update(req.params.id, name);

    return res.json(result);
  } catch (err) {
    next(err);
  }
};

/*
  @desc Delete Project
  @route DELETE /api/projects/:id
*/
exports.destroy = (req, res, next) => {
  return res.json('hello from project destroy');
};

