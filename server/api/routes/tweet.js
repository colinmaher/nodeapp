const router = require('express').Router();

router.post('/', (req, res, next) => {
  console.log(req.body)
  console.log(req.body.payload)
  if (!req.body) return res.sendStatus(400);
  return res.sendStatus(200)
});

module.exports = router;