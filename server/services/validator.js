const { check, validationResult } = require('express-validator');
const debug = require('debug')('t-issue:validatorService');
const User = require.main.require('./db/models/user');
const Tag = require.main.require('./db/models/tag');
const Priority = require.main.require('./db/models/priority');
const Project = require.main.require('./db/models/project');
const Status = require.main.require('./db/models/status');

exports.createUser = [
  check('first_name')
  .isLength({ min: 2, max: 50}).withMessage('Name must be between 2 and 50 characters')
  .not().isEmpty().withMessage('Name must not be empty')
  .bail()
  .customSanitizer(value => value.toLowerCase())
  .escape()
  .trim(),
  check('last_name')
  .isLength({ min: 2, max: 50}).withMessage('Last name must be between 2 and 50 characters')
  .not().isEmpty().withMessage('Last name must not be empty')
  .bail()
  .customSanitizer(value => value.toLowerCase())
  .escape()
  .trim(),
  check('email', 'Email must be valid')
  .not().isEmpty()
  .isEmail()
  //.normalizeEmail({ gmail_remove_dots: false }) TODO reactivate when done testing
  .custom(async (email) => {
     return await checkMail(email);
  }),
  check('password', 'Password must be at least 8 characters long')
  .isLength({ min: 8, max: 50 }),
  check('password_confirmation', 'Password confirmation must match password field')
  .custom((confirmation, { req }) => {
    if (confirmation !== req.body.password) {
      throw new Error;
    }

    return true;
  }),
  check('admin_password', 'Wrong admin password')
  .if((value, { req }) => req.body.admin) // Keep validating this field only if admin checkbox is ticked
  .escape()
  .trim()
  .custom(adminPass => {
    if (adminPass !== process.env.ADMIN_PASS) {
      throw new Error;
    }

    return true;
  })
];

exports.createProject = [
  check('name')
  .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
  .not().isEmpty().withMessage('Name must not be empty')
  .bail()
  .escape()
  .trim(),
  check('description')
  .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters')
  .escape()
  .trim()
];

exports.editProject = exports.createProject;

exports.createIssue = [
  check('title')
  .isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters'),
  check('description')
  .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
  check('tag_id')
  .custom(async tagId => {
    return await isIdValid('tag', tagId);
  }),
  check('assignee_id')
  .custom(async assigneeId => {
    return await isIdValid('assignee', assigneeId);
  })
  .optional(),
  check('creator_id')
  .custom(async (creatorId, { req }) => {
    return await isIdValid('creator', creatorId, req);
  }),
  check('priority_id')
  .custom(async priorityId => {
    return await isIdValid('priority', priorityId);
  }),
  check('project_id')
  .custom(async projectId => {
    return await isIdValid('project', projectId);
  }),
  check('status_id')
  .custom(async statusId => {
    return await isIdValid('status', statusId);
  })
];

async function checkMail(email) {
  try {
    const user = await User.findByMail(email);

    if (user !== null) {
      return Promise.reject('Email is already registered');
    }

    return true;
  } catch (err) {

    debug(err);
    return err;
  }
}

async function isIdValid(field, fieldId, req) {
  try {
    let validEntry;

    switch(field) {
      case 'tag':
        validEntry = await Tag.findById(fieldId);
        break;
      case 'assignee':
        validEntry = await User.findById(fieldId);
        break;
      case 'creator':
        validEntry = parseInt(fieldId) === req.user.user_id ? true : null;
        break;
      case 'priority':
        validEntry = await Priority.findById(fieldId);
        break;
      case 'project':
        validEntry = await Project.findById(fieldId);
        break;
      case 'status':
        validEntry = await Status.findById(fieldId);
        break;
    }

    if (validEntry !== null) {
      return true;
    }

    return Promise.reject(`${field} id is invalid`);
  } catch (err) {
    debug(err);
    return err;
  }
}
