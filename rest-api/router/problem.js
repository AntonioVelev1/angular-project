const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { problemController, postController } = require('../controllers');

// middleware that is specific to this router

router.get('/all', problemController.getproblems);
router.post('/create', auth(), problemController.createproblem);

router.get('/:problemId', problemController.getproblem);
router.post('/:problemId', auth(), postController.createPost);
router.put('/:problemId', auth(), problemController.subscribe);
router.put('/:problemId/posts/:postId', auth(), postController.editPost);
router.delete('/:problemId/posts/:postId', auth(), postController.deletePost);

// router.get('/my-trips/:id/reservations', auth(), problemController.getReservations);

module.exports = router