const app = require('express')
const router = app.Router()
const mongoose = require('mongoose')
const UserModel = require('../models/userModel').UserModel
const TweetModel = require('../models/tweetModel').TweetModel
const TagModel = require('../models/tagModel').TagModel

async function getUser(res, id) {
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log("connected to mongo")
  });

  // pull from mongo for now
  // later make redis cache of feeds and update them as tweets come in
  try {
    return UserModel.findOne({ oktaId: id })
  } catch (err) {
    throw Error(err)
  }
}

router.get('/:oktaId', async (req, res) => {
  if (!req.params.oktaId) return res.sendStatus(400);
  try {
    const userData = await getUser(res, req.params.oktaId)
    // console.log(userData)
    res.status(200).send(userData)
  }
  catch (err) {
    console.log(err)
    res.status(400).send("Error fetching user data.")
  }
})

// to be tested
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
  // console.log(tags)
  tweet.tags = tags
  // tweet.save()
}

// to be tested
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
  // console.log(mentions)
  tweet.mentions = mentions
  // tweet.save()
}

async function postTweet(tweetObj) {
  try {
    // add tweet to mongo here
    const doc = await UserModel.findOne({ oktaId: tweetObj.authorOktaId })
    const tweet = await TweetModel.create(tweetObj)
    await addTagsToTweet(tweet)
    await addMentionsToTweet(tweet)
    doc.tweets.push(tweet)
    doc.save()
    return tweet
  }
  catch (err) {
    throw Error(err)
  }
}


async function validateTweet(tweet, id) {
  if (tweet && tweet.length > 0 && tweet.length <= 280 && id !== undefined) {
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
    const tweet = await postTweet(tweetObj)
    res.status(200).send(tweet)
  }
  catch (err) {
    console.log(err)
    res.send("Error: Tweets can only be 1 to 280 characters in length").status(400)
  }
})

async function deleteTweet(oktaId, id) {
  try {
    const userDoc = await UserModel.findOne({ oktaId: oktaId })
    userDoc.tweets.pull({ _id: id })
    userDoc.save()
    res.status(200)
  }
  catch (err) {
    throw Error(err)
  }
}

router.post('/:oktaId/delete/:tweetId', async (req, res) => {
  if (!req.params.oktaId || !req.body || !req.params.tweetId) return res.sendStatus(400);
  try {
    await deleteTweet(req.params.oktaId, req.params.tweetId)
    res.status(200)
  }
  catch (err) {
    console.log(err)
    res.send("Error: Tweets can only be 1 to 280 characters in length").status(400)
  }
})

module.exports = router