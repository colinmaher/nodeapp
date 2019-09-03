const app = require('express')
const router = app.Router();
const mongoose = require('mongoose');
const UserModel = require('../models/userModel').UserModel
const TweetModel = require('../models/tweetModel').TweetModel;
const TagModel = require('../models/tagModel').TagModel;

async function getUser(id) {
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("connected to mongo")
  });

  // pull from mongo for now
  // later make redis cache of feeds and update them as tweets come in
  try {
    await UserModel.findOne({ oktaId: id })
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
  catch (err) {
    console.log(err)
    res.status(400).send("Error fetching user data.")
  }
})

async function postTweet(tweetObj) {
  try {
    const doc = await UserModel.findOne({ oktaId: tweetObj.authorOktaId })
    const tweet = await TweetModel.create(tweetObj)
    doc.tweets.push(tweet)
    doc.save()
  }
  catch (err) {
    console.log(err)
    throw Error()
  }
}

async function parseTags(tweet) {
  const tokens = tweet.split(' ')
  const tags = [];
  for (let i = 0; i < tokens.length; ++i) {
    // console.log(tokens[i])
    if (tokens[i][0] === '#') {
      const tag = tokens[i].substring(1, tokens[i].length)
      try {
        const doc = await TagModel.findOne({ tag: tag })
        doc.tweets.push(tweet)
        doc.save()
        tags.push(doc)
      }
      catch (err) {
        const newTagDoc = await TagModel.create({ tag: tag, tweets: [tweet] })
        tags.push(newTagDoc)
      }
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
      // console.log(mention)
      try {
        const userDoc = await UserModel.findOne({ username: mention })
        mentions.push(userDoc._id)
      }
      catch (err) {
        console.log(err)
        // throw Error()
      }
    }
  }
  console.log(mentions)
  return mentions
}

async function validateTweet(tweet) {
  if (tweet && tweet.length > 0 && tweet.length <= 280) {
    const mentions = await parseMentions(tweet)
    const tags = await parseTags(tweet)
    console.log("tags:")
    console.log(tags)
    const tweetObj = {
      mentions: mentions,
      tags: tags,
      text: tweet,
    }
    return tweetObj
  }
  else throw Error("Error: Tweets can only be 1 to 280 characters in length")
}

router.post('/:oktaId/tweet', async (req, res) => {
  if (!req.params.oktaId || !req.body) return res.sendStatus(400);
  try {
    const validatedTweet = await validateTweet(req.body.tweet)
    validatedTweet.authorOktaId = req.params.oktaId
    console.log(req.params.oktaId)
    await postTweet(validatedTweet)
    res.send(200)
  }
  catch (err) {
    console.log(err)
    res.send("Error posting tweet").status(400)
  }
})

module.exports = router;