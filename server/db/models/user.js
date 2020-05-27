require('dotenv').config();
const db = require('../db');
const debug = require('debug')('t-issue:userModel');

//function personFactory( firstName, lastName, email, password, roleId ) {
//}

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


