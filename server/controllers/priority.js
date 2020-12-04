const debug = require('debug')('t-issue:priorityController');

// Models
const Priority = require.main.require('./db/models/priority');

/*
  @desc Get all priorities
  @route GET /api/priorities
*/
exports.index = async (req, res, next) => {
  try {
    const results = await Priority.findAll();

    return res.json(results);
  } catch (err) {
    next(err);
  }
};
