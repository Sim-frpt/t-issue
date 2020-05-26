
exports.index = (req, res, next) => {
  return res.json('hello from user index');
};

exports.new = (req, res, next) => {
  return res.json('hello from user new');
};

exports.create = (req, res, next) => {
  return res.json('hello from user create');
};

exports.show = (req, res, next) => {
  return res.json('hello from user show');
};

exports.edit = (req, res, next) => {
  return res.json('hello from user edit');
};

exports.update = (req, res, next) => {
  return res.json('hello from user update');
};

exports.destroy = (req, res, next) => {
  return res.json('hello from user destroy');
};

