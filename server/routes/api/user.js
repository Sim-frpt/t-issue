const express = require('express');
const userController = require.main.require('./controllers/user');
const validator = require.main.require('./services/validator');
const router = express.Router();

router.get('/users', userController.index);

router.get('/users/new', userController.new);

router.post('/users', validator.createUser, userController.create);

router.get('/users/:id', userController.show);

router.get('/users/:id/edit', userController.edit);

router.put('/users/:id', userController.update);

router.delete('/users/:id', userController.destroy);

module.exports = router;
