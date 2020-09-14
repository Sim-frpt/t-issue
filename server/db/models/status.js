const db = require.main.require('./config/db');
const debug = require('debug')('t-issue:statusModel');

exports.findAll = async () => {
  const query = 'SELECT * from status';

  try {
    const results = db.many(query);

    return results;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
}

exports.findById = async (id) => {
  const query = {
    text: 'SELECT * from status WHERE status_id = $1',
    values: [ id ]
  };

  try {
    const results = db.oneOrNone(query);

    return results;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
}
