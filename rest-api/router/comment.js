const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { commentController } = require('../controllers');

// middleware that is specific to this router

router.get('/', commentController.getLatestscomments);
router.post('/create', commentController.createcomment);

router.put('/edit/:id', commentController.editcomment);
router.get('/delete/:id', commentController.deletecomment);

module.exports = router