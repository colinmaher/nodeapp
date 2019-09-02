const app = require('express')
const router = app.Router();
const mongoose = require('mongoose');
const UserModel = require('../models/userModel').UserModel
const TweetModel = require('../models/tweetModel').TweetModel
const TagModel = require('../models/tagModel').TagModel

async function parseTags(tweet) {
  const tokens = tweet.split(' ')
  const tags = [];
  for (let i = 0; i < tokens.length; ++i) {
    console.log(tokens[i])
    if (tokens[i][0] === '#') {
      const tag = tokens[i].substring(1, tokens[i].length)
      await TagModel.findOne({ tag: tag })
        .then((doc) => {
          tags.push({
            tag: tokens[i], tagid: doc.id || null
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  console.log(tags)
  return tags
}

async function parseMentions(tweet) {
  const tokens = tweet.split(' ')
  const mentions = [];
  for (let i = 0; i < tokens.length; ++i) {
    if (tokens[i][0] === '@') {
      const mention = tokens[i].substring(1)
      console.log(mention)
      await UserModel.findOne({ username: mention })
        .then(() => {
          mentions.push({ mention: tokens[i], uid: doc.id })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  return mentions
}

async function postTweet(req, res) {
  const db = mongoose.connection;
  // console.log(db)
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log("connected to mongo")
  });

  if (!req.body) return res.sendStatus(400);
  const tweet = req.body.tweet;
  const info = req.body.userInfo;
  console.log(info)
  if (info)
    if (tweet.length < 280 && tweet.length > 0) {
      const tags = await parseTags(tweet)
      const mentions = await parseMentions(tweet)
      const processedTweet = { username: info.name, oktaId: info.sub, text: tweet, tags: tags, mentions: mentions, }
      console.log(processedTweet)
      await TweetModel.create(processedTweet)
        .then(() => {
          res.send(processedTweet).sendStatus(200);
        })
        .catch((err) => {
          console.log(err)
          res.status(400).send("Error posting tweeet")
        });
    }
    else {
      res.status(400).send("Tweets must be fewer than 280 characters in length.")
    }
  else res.status(400).send("Authentication error please sign in.")
}

async function updateLike(req) {

}

router.post('/updateLike', async (req, res) => {
  await updateLike(req).catch((err) => {
    console.log(err)
    res.status(400)
      .send("Error updating like")
  })
})

router.post('/', async (req, res) => {
  console.log(req.body);
  console.log(req.session);
  await postTweet(req, res).catch(err => {
    console.log(err);
    return res.status(400).send("Error posting tweet");
  });
});

module.exports = router;