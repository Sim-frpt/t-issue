const db = require.main.require('./config/db');
const debug = require('debug')('t-issue:projectModel');

exports.create = async (name, description) => {
  const query = {
    text: 'INSERT INTO project(name, description) VALUES($1, $2) RETURNING project_id',
    values: [ name, description ]
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
  //const query = 'SELECT p.name, u.first_name || \' \' || u.last_name as member, r.name as role FROM project p INNER JOIN projects_users p_u ON p.project_id = p_u.project_id INNER JOIN "user" u ON u.user_id = p_u.user_id INNER JOIN role r on u.role_id = r.role_id';

  const query = 'SELECT * FROM project';

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

exports.findByName = async name => {
  const query = {
    text: 'SELECT * FROM project WHERE name = $1',
    values: [ name ]
  };

  try {
    const result = await db.one(query);

    return result;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
};

//exports.findByAdmin = async adminId => {
  //const query = {
    //text: 'SELECT * FROM project WHERE admin_id = $1',
    //values: [ adminId ]
  //};

  //try {
    //const result = await db.any(query);

    //return result;
  //} catch (err) {
    //debug('ERROR:', err);

    //return err.message || err;
  //}
//}

// TODO maybe delete this, or maybe I'll need it for something else
exports.insertIntoJoinTable = async (projectId, userId) => {
  const query = {
    text: 'INSERT INTO projects_users(project_id, user_id) VALUES($1, $2)',
    values: [ projectId, userId ]
  };

  try {
    const result = await db.one(query);

    return result;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
}

exports.update = async (id, name, description) => {
  const query = {
    text: 'UPDATE project SET name = $1, description = $2 WHERE project_id = $3 RETURNING project_id',
    values: [ name, description, id ]
  };

  try {
    const result = await db.one(query);

    return result;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
};
