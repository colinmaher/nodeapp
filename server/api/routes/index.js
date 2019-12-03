const app = require('express')
const router = app.Router();
const TweetModel = require('../models/tweetModel').TweetModel

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

module.exports = router;