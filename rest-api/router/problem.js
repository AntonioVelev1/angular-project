const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { problemController, commentController } = require('../controllers');

// middleware that is specific to this router

router.get('/all', problemController.getproblems);
router.post('/create', auth(), problemController.createproblem);
router.delete('/delete/:id', auth(), problemController.deleteProblem);

router.get('/:problemId', problemController.getproblem);
router.post('/:problemId', auth(), commentController.createcomment);
router.put('/:problemId', auth(), problemController.subscribe);
router.put('/:problemId/comments/:commentId', auth(), commentController.editcomment);
router.delete('/:problemId/comments/:commentId', auth(), commentController.deletecomment);

// router.get('/my-trips/:id/reservations', auth(), problemController.getReservations);

module.exports = router