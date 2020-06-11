const db = require.main.require('./config/db');
const debug = require('debug')('t-issue:projectModel');

exports.create = async (name, adminId) => {
  const query = {
    text: 'INSERT INTO project(name, admin_id) VALUES($1, $2) RETURNING project_id',
    values: [ name, adminId ]
  };

  try {
    const results = await db.one(query);

    return results;
  } catch (err) {
    debug('ERROR:', err);
    return err.message || err;
  }
};

exports.delete = async projectId =>  {
  const query = {
    text: 'DELETE FROM project WHERE project_id = $1 RETURNING project_id',
    values: projectId
  };

  try {
    const result = await db.one(query);

    return result;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
};

exports.findAll = async () => {
  const query = 'SELECT p.name, u.first_name || \' \' || u.last_name as member, r.name as role FROM project p INNER JOIN projects_users p_u ON p.project_id = p_u.project_id INNER JOIN "user" u ON u.user_id = p_u.user_id INNER JOIN role r on u.role_id = r.role_id';

  try {
    const results = await db.any(query);

    return results;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
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

    return err.message || err;
  }
};

exports.update = async (id, name) => {
  const query = {
    text: 'UPDATE project SET name = $1 WHERE project_id = $2 RETURNING project_id',
    values: [ name, id ]
  };

  try {
    const result = await db.one(query);

    return result;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
}
