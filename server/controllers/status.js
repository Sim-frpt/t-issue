const debug = require('debug')('t-issue:statusController');

const Status = require.main.require('./db/models/status');

/*
  @desc Get all status
  @route GET /api/status
*/
exports.index = async (req, res, next) => {
  try {
    const results = await Status.findAll();

    return res.json(results);
  } catch (err) {
    next(err);
  }
};
