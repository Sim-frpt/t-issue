const db = require('../db');
const debug = require('debug')('t-issue:projectModel');

exports.findAll = async () => {
  const query = 'SELECT p.name, u.first_name || \' \' || u.last_name as member, r.name as role FROM project p INNER JOIN projects_users p_u ON p.project_id = p_u.project_id INNER JOIN "user" u ON u.user_id = p_u.user_id INNER JOIN role r on u.role_id = r.role_id';

  try {
    const results = await db.any(query);

    return results;
  } catch (err) {
    debug('ERROR:', err);
  }
};

exports.findById = async (id) => {
  const query = {
    text: 'SELECT * FROM project WHERE project_id = $1',
    values: [ id ]
  };

  try {
    const result = await db.oneOrNone(query);

    return result;
  } catch (err) {
    debug('ERROR:', err);
  }
};
