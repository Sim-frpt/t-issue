const debug = require('debug')('t-issue:tagController');

// Models
const Tag = require.main.require('./db/models/tag');

/*
  @desc Get all tags
  @route GET /api/tags
*/
exports.index = async (req, res, next) => {
  try {
    const results = await Tag.findAll();

    return res.json(results);
  } catch (err) {
    next(err);
  }
};
