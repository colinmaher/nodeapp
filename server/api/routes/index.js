const app = require('express')
const router = app.Router();
const TweetModel = require('../models/tweetModel').TweetModel
const UserModel = require('../models/userModel').UserModel

router.use('/users', require('./users'));
router.use('/user', require('./user'));

async function getLatestTweets(page, limit) {
  console.log(page)
  console.log(limit)
  const pageOptions = {
    page: page || 0,
    limit: limit || 25,
  }
  try {
    const tweetDocs = await TweetModel.find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .sort({ created: 'descending' })
    // console.log(tweetDocs)
    return tweetDocs
  }
  catch (e) {
    console.log(e)
    throw "Error fetching latest tweets"
  }
}


router.get('/latestTweets', async (req, res) => {
  try {
    const latestTweets = await getLatestTweets(parseInt(req.query.page), parseInt(req.query.limit))
    // console.log(userData)
    res.status(200).send(latestTweets)
  }
  catch (e) {
    res.status(400).send(e)
  }
})

async function getTweetsById(id) {
  try {
    const tweetDocs = await UserModel.findOne({ oktaId: id })
    // console.log(tweetDocs.tweets)
    return tweetDocs.tweets
  }
  catch (err) {
    console.log(err)
    throw "Error fetching tweets"
  }
}

router.get('/tweets/:id', async (req, res) => {
  if (!req.params.id) return res.sendStatus(400);
  try {
    const tweets = await getTweetsById(req.params.id)
    res.status(200).send(tweets)
  }
  catch (err) {
    res.status(400).send(e)
  }
})

module.exports = router;