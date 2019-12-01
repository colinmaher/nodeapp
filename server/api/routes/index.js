const app = require('express')
const router = app.Router();
const TweetModel = require('../models/tweetModel').TweetModel

router.use('/users', require('./users'));
router.use('/user', require('./user'));

function getLatestTweets(page, limit) {
  console.log(page)
  console.log(limit)
  const pageOptions = {
    page: page || 0,
    limit: limit || 25,
  }
  try {
    return TweetModel.find()
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit)
      .sort({ created: 'descending' })
  }
  catch (err) {
    throw Error(err)
  }
}


router.get('/latestTweets', async (req, res) => {
  try {
    const latestTweets = await getLatestTweets(parseInt(req.query.page), parseInt(req.query.limit))
    // console.log(userData)
    res.status(200).send(latestTweets)
  }
  catch (err) {
    res.status(400).send("Error fetching latest tweets.")
  }
})

module.exports = router;