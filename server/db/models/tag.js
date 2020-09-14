const db = require.main.require('./config/db');
const debug = require('debug')('t-issue:tagModel');

exports.findAll = async () => {
  const query = 'SELECT * from tag';

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
    text : 'SELECT * FROM tag WHERE tag.tag_id = $1',
    values: [ id ]
  };

  try {
    const result = db.oneOrNone(query);

    return result;
  } catch (err) {
    debug('ERROR:', err);

    return err.message || err;
  }
}
