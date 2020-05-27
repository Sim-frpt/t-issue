const { check, validationResult } = require('express-validator');
const debug = require('debug')('t-issue:userValidation');
const User = require.main.require('./db/models/user');

function userValidation() {
  return [
    check('first_name')
    .isLength({ min: 2, max: 50}).withMessage("Name must be between 2 and 50 characters")
    .not().isEmpty().withMessage("Name must not be empty")
    .isAlpha().withMessage("Name must not contain numbers")
    .customSanitizer(value => value.toLowerCase())
    .escape()
    .trim(),
    check('last_name')
    .isLength({ min: 2, max: 50}).withMessage("Last name must be between 2 and 50 characters")
    .not().isEmpty().withMessage("Last name must not be empty")
    .isAlpha().withMessage("Last Name must not contain numbers")
    .customSanitizer(value => value.toLowerCase())
    .escape()
    .trim(),
    check('email', 'Email must be valid')
    .not().isEmpty()
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false })
    .custom(async (email) => {
      debug(email);
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
}

async function isMailAlreadyInUse(email) {
  try {
    const user = await User.findByMail(email);
    debug(user);
    if (user !== null) {
      return true;
    }

    return false;
  } catch (err) {
    debug(err);
  }
}

module.exports = userValidation;
