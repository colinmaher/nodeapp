const mongoose = require('mongoose');
const tweetSchema = new mongoose.Schema({
    authorId: { type: mongoose.Schema.Types.ObjectId, default: null }, // change later
    authorOktaId: String,
    text: String,
    isRetweet: { type: Boolean, default: false },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag', default: [] }],
    mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    liked: {type: Boolean, default: false},
    retweets: { type: Number, default: 0 },
    numLikes: { type: Number, default: 0 },
    whoLikes: [{ type: mongoose.Schema.Types.ObjectId, default: [] }],
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});
const TweetModel = mongoose.model('Tweet', tweetSchema);
module.exports = { TweetModel: TweetModel, TweetSchema: tweetSchema };