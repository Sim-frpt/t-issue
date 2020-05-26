exports.index = (req, res, next) => {
  return res.json('hello from project index');
};

exports.new = (req, res, next) => {
  return res.json('hello from project new');
};

exports.create = (req, res, next) => {
  return res.json('hello from project create');
};

exports.show = (req, res, next) => {
  return res.json('hello from project show');
};

exports.edit = (req, res, next) => {
  return res.json('hello from project edit');
};

exports.update = (req, res, next) => {
  return res.json('hello from project update');
};

exports.destroy = (req, res, next) => {
  return res.json('hello from project destroy');
};

