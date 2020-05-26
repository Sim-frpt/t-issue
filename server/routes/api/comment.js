const express = require('express');
const commentController = require('../../controllers/comment');

const router = express.Router();

router.get('/comments', commentController.index);

router.get('/comments/new', commentController.new);

router.post('/comments', commentController.create);

router.get('/comments/:id', commentController.show);

router.get('/comments/:id/edit', commentController.edit);

router.put('/comments/:id', commentController.update);

router.delete('/comments/:id', commentController.destroy);

module.exports = router;
