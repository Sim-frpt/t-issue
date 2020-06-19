const { check, validationResult } = require('express-validator');
const debug = require('debug')('t-issue:validatorService');
const User = require.main.require('./db/models/user');
const Tag = require.main.require('./db/models/tag');

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
    if (await isMailAlreadyInUse(email)) {
      return Promise.reject('Email is already registered');
    }
  }),
  check('password', 'Password must be at least 8 characters long')
  .isLength({ min: 8, max: 50 }),
  check('password_confirmation', 'Password confirmation must match password field')
  .custom((confirmation, { req }) => {
    if (confirmation !== req.body.password) {
      return Promise.reject();
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
  .trim()
];

exports.editProject = exports.createProject;

exports.createIssue = [
  check('title')
  .isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters'),
  check('description')
  .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
  check('tag_id') // Check that the tag ID is not bigger than the biggest tag id in db
  .custom( async tagId => {
    try {
      const maxId = await Tag.getMaxTagId()
        .then(data => data.tag_id)
        .catch(err => err);

      if (tagId > maxId) {
        return Promise.reject(`tagId cannot be bigger than ${maxId}`);
      }
    } catch (err) {
      debug(err);

      return err;
    }
  }),
  //check('assignee_id'),
  //check('creator_id'),
  //check('priority_id'),
  //check('project_id'),
  //check('status_id')
];

async function isMailAlreadyInUse(email) {
  try {
    const user = await User.findByMail(email);

    if (user !== null) {
      return true;
    }

    return false;
  } catch (err) {
    debug(err);
  }
}
