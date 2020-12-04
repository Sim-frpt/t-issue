const express = require('express');
const statusController = require.main.require('./controllers/status');
const router = express.Router();

router.get('/status', statusController.index);

module.exports = router;
