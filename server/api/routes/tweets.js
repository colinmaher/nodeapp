const app = require('express')
const router = app.Router();
const mongoose = require('mongoose');
const TweetModel = require('../models/tweetModel').TweetModel
const UserModel = require('../models/userModel').UserModel


async function getTweets(req, res) {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("connected to mongo")
  });

  if (!req.body) return res.sendStatus(400);
  // pull from mongo for now
  // later make redis cache of feeds and update them as tweets come in
  
  await TweetModel.find({})

}
router.get('/', async (req, res) => {
  await getTweets().catch((err) => {
    console.log(err)
    res.status(400).send("Error fetching tweets.")
  })
})

module.exports = router;