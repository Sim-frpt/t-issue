const express = require('express');
const tagController = require.main.require('./controllers/tag');
const router = express.Router();

router.get('/tags', tagController.index);

module.exports = router;

