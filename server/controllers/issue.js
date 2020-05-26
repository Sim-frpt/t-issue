exports.index = (req, res, next) => {
  return res.json('hello from issue index');
};

exports.new = (req, res, next) => {
  return res.json('hello from issue new');
};

exports.create = (req, res, next) => {
  return res.json('hello from issue create');
};

exports.show = (req, res, next) => {
  return res.json('hello from issue show');
};

exports.edit = (req, res, next) => {
  return res.json('hello from issue edit');
};

exports.update = (req, res, next) => {
  return res.json('hello from issue update');
};

exports.destroy = (req, res, next) => {
  return res.json('hello from issue destroy');
};

