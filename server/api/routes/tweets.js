const app = require('express')
const router = app.Router();
const mongoose = require('mongoose');
const TweetModel = require('../models/tweetModel').TweetModel
const UserModel = require('../models/userModel').UserModel


async function getTweets(req, res) {
  const db = mongoose.connection;
  // console.log(db)
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log("connected to mongo")
  });

  if (!req.body) return res.sendStatus(400);
  const info = req.body.userInfo;
  if (info)
    if (tweet.length < 280 && tweet.length > 0) {
      const tags = await parseTags(tweet)
      const mentions = await parseMentions(tweet)
      const processedTweet = { displayName: info.name, authorId: info.sub, text: tweet, tags: tags, mentions: mentions, }
      console.log(processedTweet)
      await TweetModel.create(processedTweet);
      return res.sendStatus(200);
    }
    else {
      return res.status(400).send("Tweets must be fewer than 280 characters in length.")
    }
  else return res.status(400).send("Authentication error please sign in.")
}

router.post('/', async (req, res, next) => {
  console.log(req.body);
  console.log(req.session);
  postTweet(req, res).catch(err => {
    console.log(err);
    return res.status(400).send("Error posting tweet");
  });
});

module.exports = router;