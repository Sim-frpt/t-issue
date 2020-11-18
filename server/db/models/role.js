const db = require.main.require('./config/db');
const debug = require('debug')('t-issue:RoleModel');

exports.findRoleId = async (role) => {
  const query = {
    text: 'SELECT role_id FROM role WHERE name = $1',
    values: [role]
  };

  try {
    const result = await db.one(query);

    return result.role_id;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
};
