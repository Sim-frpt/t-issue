const { validationResult } = require('express-validator');
const debug = require('debug')('t-issue:projectController');
const db = require.main.require('./config/db');

// Models
const Project = require.main.require('./db/models/project');

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

  const { name, description } = req.body;

  try {
    const result = await Project.create(name, description);

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

      return next(error);
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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }

  const { name, description } = req.body;

  try {
    const currentProject = await Project.findById(req.params.id);

    if (currentProject == null) {
      const error = new Error('Project not found');
      error.status = 404;

      next(error);
    }

    const result = await Project.update(req.params.id, name, description);

    return res.json(result);
  } catch (err) {
    next(err);
  }
};

/*
  @desc Delete Project
  @route DELETE /api/projects/:id
*/
exports.destroy = async (req, res, next) => {
  try {
    const projectToDel = await Project.findById(req.params.id);

    if (projectToDel == null) {
      const error = new Error('Project not found');
      error.status = 404;

      next(error);
    }

    const deletedProjectId = await Project.delete(req.params.id);

    res.json(deletedProjectId);
  } catch (err) {
    next(err);
  }
};

