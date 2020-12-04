const express = require('express');
const priorityController = require.main.require('./controllers/priority');
const router = express.Router();

router.get('/priorities', priorityController.index);

module.exports = router;

