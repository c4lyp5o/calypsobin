const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create the schema
var postSchema = new Schema({
    title: String,
    description: String,
    created_at: Date,
    created_by: String,
    uniqueID: String
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;