const mongoose = require('mongoose');
const user = require('./user.model');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    username:{type: String, required : true},
    message: {type: String, required : true},
},{
    timestamps : true,
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;