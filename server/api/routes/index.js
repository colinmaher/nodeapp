const app = require('express')
const router = app.Router();

router.use('/users', require('./users'));
router.use('/tweet', require('./tweet'));

module.exports = router;