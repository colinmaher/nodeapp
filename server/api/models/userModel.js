const mongoose =  require('mongoose');
const tweetSchema = require('./tweetModel').TweetSchema;
const userSchema = new mongoose.Schema({
    name: String,
    displayName: String,
    id: String,
    email: String,
    profilePicUrl: String,
    tweets: { type: [tweetSchema], default: [] },
    followers: { type: [this], default: [] },
    following: { type: [this], default: [] },
    retweets: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});
const UserModel = mongoose.model('User', userSchema);
module.exports = { UserModel: UserModel, UserSchema: userSchema };