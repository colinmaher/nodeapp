const mongoose =  require('mongoose');
// const tweetSchema = require('./tweetModel').TweetSchema;
const TweetModel = require('./tweetModel').TweetModel;
const userSchema = new mongoose.Schema({
    name: String,
    displayName: String,
    id: String,
    email: String,
    profilePicUrl: {type: String, default: ""},
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet', default: [] }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    retweets: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Tweet', default: [] }],
    likes: [{ type:  mongoose.Schema.Types.ObjectId, ref: 'Tweet', default: [] }],
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});
const UserModel = mongoose.model('User', userSchema);
module.exports = { UserModel: UserModel, UserSchema: userSchema };