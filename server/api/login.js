const express = require('express');
const router = express.Router();
const auth = require('../auth');

router.get('/', auth.optional, (req, res) => {
    
})

module.exports = router;