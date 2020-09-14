const db = require.main.require('./config/db');
const debug = require('debug')('t-issue:priorityModel');

exports.findAll = async () => {
  const query = 'SELECT * from priority';

  try {
    const results = db.many(query);

    return results;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
}

exports.findById = async(priorityId) => {
  const query = {
    text: 'SELECT * FROM priority WHERE priority_id = $1',
    values: [ priorityId ]
  };

  try {
    const results = db.oneOrNone(query);

    return results;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err
  }
}
