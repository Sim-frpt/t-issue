const express = require('express');
const userController = require('../../controllers/user');

const router = express.Router();

router.get('/users', userController.index);

router.get('/users/new', userController.new);

router.post('/users', userController.create);

router.get('/users/:id', userController.show);

router.get('/users/:id/edit', userController.edit);

router.put('/users/:id', userController.update);

router.delete('/users/:id', userController.destroy);

module.exports = router;
