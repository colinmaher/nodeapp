const router = require('express').Router();
const mongoose = require('mongoose');
const TweetModel = require('../models/tweetModel')

router.post('/', (req, res, next) => {
  // console.log(req.body);
  console.log(req.session);
  const db = mongoose.connection;
  // console.log(db)
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log("connected to mongo")
  });
  
  if (!req.body) return res.sendStatus(400);
  if (req.body.userInfo)
    if (req.body.tweet.length < 280 && req.body.tweet.length > 0) {
      const tweet = new TweetModel({ authorName: req.body.userInfo.name, authorId: req.body.userInfo.sub })
      // console.log(req.body.userInfo.name)
      TweetModel.create(tweet);
      return res.sendStatus(200);
    }
    else {
      return res.status(400).send("Tweets must be fewer than 280 characters in length.")
    }
  else return res.status(400).send("Authentication error please sign in.")
});

module.exports = router;