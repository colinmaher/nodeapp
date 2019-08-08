const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/tweet', require('./tweet'));

module.exports = router;