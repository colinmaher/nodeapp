const app = require('express')
const router = app.Router()
const mongoose = require('mongoose')
const UserModel = require('../models/userModel').UserModel
const TweetModel = require('../models/tweetModel').TweetModel
const TagModel = require('../models/tagModel').TagModel

async function getUser(id) {
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
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

async function addTagsToTweet(tweet) {
  const tokens = tweet.text.split(' ')
  const tags = [];
  for (let i = 0; i < tokens.length; ++i) {
    // console.log(tokens[i])
    if (tokens[i][0] === '#') {
      const tag = tokens[i].substring(1, tokens[i].length)
      try {
        const doc = await TagModel.findOne({ tag: tag })
        doc.tweets.push(tweet._id)
        doc.save()
        tags.push(doc._id)
      }
      catch (err) {
        const newTagDoc = await TagModel.create({ tag: tag, tweets: [tweet._id], authorOktaId: tweet.authorOktaId })
        tags.push(newTagDoc._id)
      }
    }
  }
  console.log(tags)
  tweet.tags = tags
  // tweet.save()
}

async function addMentionsToTweet(tweet) {
  const tokens = tweet.text.split(' ')
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
        mentions.push(null)
      }
    }
  }
  console.log(mentions)
  tweet.mentions = mentions
  // tweet.save()
}

async function postTweet(tweetObj) {
  try {
    const doc = await UserModel.findOne({ oktaId: tweetObj.authorOktaId })
    const tweet = await TweetModel.create(tweetObj)
    doc.tweets.push(tweet)
    // doc.save()
    return tweet
  }
  catch (err) {
    console.log(err)
    throw Error()
  }
}

async function validateTweet(tweet, id) {
  if (tweet && tweet.length > 0 && tweet.length <= 280) {
    const tweetObj = {
      text: tweet,
      authorOktaId: id
    }
    return tweetObj
  }
  else throw Error("Invalid tweet")
}

router.post('/:oktaId/tweet', async (req, res) => {
  if (!req.params.oktaId || !req.body) return res.sendStatus(400);
  try {
    const tweetObj = await validateTweet(req.body.tweet, req.params.oktaId)
    const tweetDoc = await postTweet(tweetObj)
    await addTagsToTweet(tweetDoc)
    await addMentionsToTweet(tweetDoc)
    tweetDoc.save()
    res.sendStatus(200)
  }
  catch (err) {
    console.log(err)
    res.send("Error: Tweets can only be 1 to 280 characters in length").status(400)
  }
})

module.exports = router