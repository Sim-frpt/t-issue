const multer = require('multer');
const multerConfig = require.main.require('./config/multer');
const upload = multer(multerConfig);
const express = require('express');
const projectController = require.main.require('./controllers/project');
const issueController = require.main.require('./controllers/issue');
const validator = require.main.require('./services/validator');
const authentication = require.main.require('./services/authentication');
const authorization = require.main.require('./services/authorization');

const router = express.Router();

router.get('/projects', projectController.index);

router.get('/projects/new', projectController.new);

router.post('/projects', authentication.checkAuth, authorization.isAdmin, validator.createProject, projectController.create);

router.get('/projects/:id', projectController.show);

router.get('/projects/:id/edit',authentication.checkAuth, authorization.isAdmin, projectController.edit);

router.put('/projects/:id', authentication.checkAuth, authorization.isAdmin, validator.editProject, projectController.update);

router.delete('/projects/:id', authentication.checkAuth, authorization.isAdmin, projectController.destroy);

router.post('/projects/:id/issues', authentication.checkAuth, authorization.isAllowedToCreateIssue, upload.single('image'), validator.createIssue, issueController.create);

module.exports = router;
