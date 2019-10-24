const app = require('express')
const router = app.Router();

router.use('/users', require('./users'));
router.use('/user', require('./user'));

module.exports = router;