const express = require('express');
const projectController = require.main.require('./controllers/project');
const validator = require.main.require('./services/validator');

const router = express.Router();

router.get('/projects', projectController.index);

router.get('/projects/new', projectController.new);

router.post('/projects', validator.createProject, projectController.create);

router.get('/projects/:id', projectController.show);

router.get('/projects/:id/edit', projectController.edit);

router.put('/projects/:id', projectController.update);

router.delete('/projects/:id', projectController.destroy);

module.exports = router;
