const mongoose = require('mongoose');
const Tweet = require('./tweet.model');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: false,
    minlength: 5
  },
  myTweets: {type: Array},
  likedTweets: {type: Array},
  followedUsers: {type: Array}
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;