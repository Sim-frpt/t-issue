const express = require('express');
const issueController = require.main.require('./controllers/issue');
const validator = require.main.require('./services/validator');
const authentication = require.main.require('./services/authentication');
const authorization = require.main.require('./services/authorization');
const router = express.Router();

router.get('/issues', issueController.index);

router.get('/issues/new', issueController.new);

router.get('/issues/:id', issueController.show);

router.get('/issues/:id/edit', authentication.checkAuth, issueController.edit);

router.put('/issues/:id', issueController.update);

router.delete('/issues/:id', authentication.checkAuth, authorization.isAllowedToDeleteIssue, issueController.destroy);

module.exports = router;

