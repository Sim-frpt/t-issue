const db = require.main.require('./config/db');
const debug = require('debug')('t-issue:projectUserModel');

exports.findRow = async (projectId, userId) => {
  const query = {
    text: 'SELECT * from projects_users WHERE project_id = $1 AND user_id = $2',
    values: [ projectId, userId ]
  };

  try {
    const result = db.oneOrNone(query);

    return result;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
}
