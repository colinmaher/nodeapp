const mongoose =  require('mongoose');
// const tweetSchema = require('./tweetModel').TweetSchema;
// const TweetModel = require('./tweetModel').TweetModel;
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    displayName: String,
    oktaId: String,  
    email: String,
    profilePicUrl: {type: String, default: ""},
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet', default: [] }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    retweets: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});
const UserModel = mongoose.model('User', userSchema);
module.exports = { UserModel: UserModel, UserSchema: userSchema };