const router = require('express').Router();
const users = require('./users');
const problems = require('./problem');
const comments = require('./comment');
const likes = require('./likes');
const test = require('./test');

router.use('/users', users);
router.use('/problems', problems);
router.use('/comments', comments);
router.use('/likes', likes);
router.use('/test', test);

module.exports = router;
