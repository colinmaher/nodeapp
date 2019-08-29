const app = require('express')
const router = app.Router();
const mongoose = require('mongoose');
const UserModel = require('../models/userModel').UserModel
const TweetModel = require('../models/tweetModel').TweetModel

async function parseTags(tweet) {
  const tokens = tweet.split(' ')
  const tags = [];
  for (let i=0; i<tokens.length; ++i) {
    console.log(token)
    if (tokens[i][0] === '#') {
      const tag = token.substring(1, token.length)
      await UserModel.findOne({ displayName: tag }, function (err, doc) {
        if (err) {
          continue
        }
        tags.push({ tag: token, tagid: doc.id || null })
      })
    }
  }
  console.log(tags)
  return tags
}

async function parseMentions(tweet) {
  const tokens = tweet.split(' ')
  const mentions = [];
  for (token in tokens) {
    if (token[0] === '@') {
      const mention = token.substring(1, token.length)
      console.log(mention)
      await UserModel.findOne({ displayName: mention }, function (err, doc) {
        if (err) {
          continue
        }
        mentions.push({ mention: token, uid: doc.id })
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

async function updateLike(req) {
  
}

router.post('/updateLike', async (req, res) => {
  await updateLike(req).catch((err) => {
    console.log(err)
    return res.status(400)
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