const express = require('express');
const issueController = require.main.require('./controllers/issue');
const validator = require.main.require('./services/validator');
const authentication = require.main.require('./services/authentication');
const authorization = require.main.require('./services/authorization');
const router = express.Router();

router.get('/issues', issueController.index);

router.get('/issues/new', issueController.new);

//router.post('/issues', authentication.checkAuth, authorization.isMemberOfProject, validator.createIssue, issueController.create);

router.get('/issues/:id', issueController.show);

router.get('/issues/:id/edit', issueController.edit);

router.put('/issues/:id', issueController.update);

router.delete('/issues/:id', issueController.destroy);

module.exports = router;

