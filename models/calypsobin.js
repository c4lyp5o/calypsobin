const mongoose = require('mongoose');
const { MONGODB_PASTE_URI } = process.env;
const Schema = mongoose.Schema;
const pastingDB = mongoose.createConnection(MONGODB_PASTE_URI);

const postSchema = new Schema({
    title: String,
    description: String,
    created_at: Date,
    created_by: String,
    uniqueID: String
});

const Post = pastingDB.model('Post', postSchema);

module.exports = Post;