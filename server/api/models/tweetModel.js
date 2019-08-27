const mongoose =  require('mongoose');
const tweetSchema = new mongoose.Schema({
    authorName: String,
    authorId: String,
    text: String,
    tags: { type: [String], default: [] },
    mentions: { type: [String], default: [] },
    retweets: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    updated: { type: Date, default: Date.now },
});
const TweetModel = mongoose.model('Tweet', tweetSchema);
module.exports = TweetModel;