const mongoose = require('mongoose');
const tagSchema = new mongoose.Schema({
    tag: String,
    authorOktaId: String,
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
});
const TagModel = mongoose.model('Tag', tagSchema);
module.exports = { TagModel: TagModel, TagSchema: tagSchema };