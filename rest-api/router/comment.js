const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { commentController } = require('../controllers');

// middleware that is specific to this router

router.get('/', commentController.getLatestscomments);
router.post('/create', commentController.createcomment);

module.exports = router