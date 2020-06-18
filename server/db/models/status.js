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
