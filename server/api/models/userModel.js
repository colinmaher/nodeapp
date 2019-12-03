const mongoose = require('mongoose');
const tweetSchema = require('./tweetModel').TweetSchema;
// const TweetModel = require('./tweetModel').TweetModel;
const colorChoices = ["deepOrange", "deepPurple", "indigo", "red", "orange", "green", "blue", "teal"]
const randomColor = () => {
  return colorChoices[Math.floor(Math.random() * Math.floor(colorChoices.length))]
}
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  oktaId: String,
  email: String,
  color: { type: String, default: randomColor() },
  profilePicUrl: { type: String, default: "" },
  tweets: [tweetSchema],
  followers: [this],
  following: [this],
  numRetweets: { type: Number, default: 0 },
  numLikes: { type: Number, default: 0 },
  likedTweets: [tweetSchema],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});
const UserModel = mongoose.model('User', userSchema);
module.exports = { UserModel: UserModel, UserSchema: userSchema };