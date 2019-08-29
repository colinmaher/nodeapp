const mongoose = require('mongoose');
const tweetSchema = new mongoose.Schema({
    authorId: mongoose.Schema.Types.ObjectId,
    text: String,
    isRetweet: { type: Boolean, default: false },
    tags: [{ type: String, default: [] }],
    mentions: [{ type: String, default: [] }],
    liked: {type: Boolean, default: false},
    retweets: { type: Number, default: 0 },
    numLikes: { type: Number, default: 0 },
    whoLikes: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});
const TweetModel = mongoose.model('Tweet', tweetSchema);
module.exports = { TweetModel: TweetModel, TweetSchema: tweetSchema };