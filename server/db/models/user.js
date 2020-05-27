require('dotenv').config();
const db = require('../db');
const debug = require('debug')('t-issue:userModel');

exports.userFactory = function (firstName, lastName, email, password, roleId) {
  return {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    role_id: roleId
  };
};

exports.create = async (firstName, lastName, email, password, roleId) => {
  const query = {
    text: 'INSERT INTO "user"(first_name, last_name, email, password, role_id) VALUES($1, $2, $3, $4, $5) RETURNING user_id',
    values: [
      firstName,
      lastName,
      email,
      password,
      roleId
    ]
  };

  try {
    const result = await db.one(query);

    return result;
  } catch (err) {
    debug('ERROR:', err);
  }
};

exports.findAll = async () => {
  const query = 'SELECT first_name, last_name, email, password, r.name as role FROM "user" u INNER JOIN role r ON u.role_id = r.role_id';

  try {
    const results = await db.any(query);

    return results;
  } catch (err) {
    debug('ERROR:', err);
  }
};

exports.findByMail = async (email) => {
  const query = {
    text: 'SELECT * FROM "user" WHERE email = $1',
    values: [ email ]
  };

  try {
    const result = await db.oneOrNone(query);

    return result;
  } catch (err) {
    debug('ERROR:', err);
  }
};

exports.findById = async (id) => {
  const query = {
    text: 'SELECT first_name, last_name, email, password, r.name as role FROM "user" u INNER JOIN role r on u.role_id = r.role_id WHERE u.role_id = $1',
    values: [ id ]
  };

  try {
    const result = await db.oneOrNone(query);

    return result;
  } catch (err) {
    debug('ERROR:', err);
  }
};

//exports.delete = async (id) => {

//}


