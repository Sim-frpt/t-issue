const Project = require.main.require('./db/models/project');

const debug = require('debug')('t-issue:projectController');
const { validationResult } = require('express-validator');

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

  return res.json('hello from project create');
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
exports.edit = (req, res, next) => {
  return res.json('hello from project edit');
};

/*
  @desc Update project
  @route PUT /api/projects/:id
*/
exports.update = (req, res, next) => {
  return res.json('hello from project update');
};

/*
  @desc Delete Project
  @route DELETE /api/projects/:id
*/
exports.destroy = (req, res, next) => {
  return res.json('hello from project destroy');
};

