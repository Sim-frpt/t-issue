const debug = require('debug')('t-issue:authorization');
const User = require.main.require('./db/models/user');
const Project = require.main.require('./db/models/project');
const ProjectUser = require.main.require('./db/models/project-user');

exports.isAdmin = (req, res, next) => {

  if (req.user.role !== 'admin') {
    const error = new Error('forbidden');
    error.status = 403;

    return next(error);
  }

  next();
}

async function isProjectAdmin (projectId, userId) {
    const actualAdmin = await Project
      .findById(projectId)
      .then(result => result.admin_id);

    if (actualAdmin === userId) {
      return true;
    }

    return false;
}

async function isMemberOfProject(projectId, userId) {
    const projectUserRow = await ProjectUser.findRow(projectId, userId);

    if (projectUserRow) {
      return true;
    }
    return false;
}

exports.isAllowedToCreateIssue = async (req, res, next) => {
  try {
    const isAdmin = await isProjectAdmin(req.params.id, req.user.user_id, next);
    const isMember = await isMemberOfProject(req.params.id, req.user.user_id, next);

    if (!isAdmin && !isMember) {
      const error = new Error('forbidden');
      error.status = 403;
      return next(error);
    }

    next();
  } catch (err) {
    return next(err);
  }
}

