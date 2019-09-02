const app = require('express')
const router = app.Router();
const mongoose = require('mongoose');
const UserModel = require('../models/userModel').UserModel

async function getUser(res, id) {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("connected to mongo")
  });

  // pull from mongo for now
  // later make redis cache of feeds and update them as tweets come in
<<<<<<< HEAD:server/api/routes/user.js
  try {
    await UserModel.findOne({ oktaId: id})
  } catch (err) {
    throw Error(err)
  }  
=======
  
  await UserModel.findById(req.body.id)
>>>>>>> 0272285324e5742ee5c0506e25a8c05213f5ce48:server/api/routes/tweets.js
}
router.get('/:oktaId', async (req, res) => {
  if (!req.params.oktaId) return res.sendStatus(400);
  try {
    const userData = await getUser(res, req.params.oktaId)
    res.status(200).send(userData)
  }
  catch(err) {
    console.log(err)
    res.status(400).send("Error fetching user data.")
  }
})

module.exports = router;