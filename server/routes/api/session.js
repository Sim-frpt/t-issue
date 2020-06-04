const express = require('express');
const sessionController = require.main.require('./controllers/session');

const router = express.Router();

router.get('/sessions', sessionController.show);

router.get('/sessions/new', sessionController.new);

router.post('/sessions', sessionController.create);

router.delete('/sessions', sessionController.destroy);

module.exports = router;
