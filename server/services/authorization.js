const debug = require('debug')('t-issue:authorization');

// Models
const Issue = require.main.require('./db/models/issue');
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

async function isProjectAdmin(projectId, userId) {
    const actualAdmin = await Project
      .findById(projectId)
      .then(result => result.admin_id)
      .catch(err => false);

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

async function isThisProjectManager(projectId, user) {
  const isProjectMember = await isMemberOfProject(projectId, user.user_id);

  if (isProjectMember && user.role === 'project manager') {
    return true;
  }

  return false;
}

exports.isAllowedToCreateIssue = async (req, res, next) => {
  try {
    const isAdmin = req.user.role === 'admin' ? true : false;

    const isMember = await isMemberOfProject(req.params.id, req.user.user_id);

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

exports.isAllowedToDeleteIssue = async (req, res, next) => {
  try {
    const currentIssue = await Issue.findById(req.params.id);
    const relatedProject = await Project.findByName(currentIssue.project);

    if (currentIssue === null) {
      const error = new Error('Issue not found');
      error.status = 404;

      return next(error);
    }

    req.currentIssue = currentIssue;

    const isAdmin = req.user.role === 'admin' ? true : false;
    const isIssueCreator = req.user.user_id === currentIssue.creator_id ? true : false;
    const isRelatedProjectManager = await isThisProjectManager(relatedProject.project_id, req.user.user_id);

    if (!isAdmin && !isIssueCreator && !isRelatedProjectManager) {
      const error = new Error('forbidden');
      error.status = 403;

      return next(error);
    }

    next();
  } catch (err) {
    return next(err);
  }
}
