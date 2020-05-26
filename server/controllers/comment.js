
exports.index = (req, res, next) => {
  return res.json('hello from comment index');
};

exports.new = (req, res, next) => {
  return res.json('hello from comment new');
};

exports.create = (req, res, next) => {
  return res.json('hello from comment create');
};

exports.show = (req, res, next) => {
  return res.json('hello from comment show');
};

exports.edit = (req, res, next) => {
  return res.json('hello from comment edit');
};

exports.update = (req, res, next) => {
  return res.json('hello from comment update');
};

exports.destroy = (req, res, next) => {
  return res.json('hello from comment destroy');
};

