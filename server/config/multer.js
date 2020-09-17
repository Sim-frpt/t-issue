const multer = require('multer');
const debug = require('debug')('t-issue:multerConfig');
const path = require('path');
const mainPath = path.dirname(require.main.filename); 

const options = {
  dest: path.join(mainPath, 'public/uploads/images/'),
  fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024,
    files: 1
  }
}

function fileFilter (req, file, cb) {
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];

  if (acceptedImageTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error('file must be a gif/jp(e)g or png'));
}

module.exports = options;
