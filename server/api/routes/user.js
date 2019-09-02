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
  try {
    await UserModel.findOne({ oktaId: id})
  } catch (err) {
    throw Error(err)
  }  
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