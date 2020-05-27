const express = require('express');
const issueController = require('../../controllers/issue');

const router = express.Router();

router.get('/issues', issueController.index);

router.get('/issues/new', issueController.new);

router.post('/issues', issueController.create);

router.get('/issues/:id', issueController.show);

router.get('/issues/:id/edit', issueController.edit);

router.put('/issues/:id', issueController.update);

router.delete('/issues/:id', issueController.destroy);

module.exports = router;
