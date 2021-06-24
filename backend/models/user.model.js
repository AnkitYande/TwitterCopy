const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

userSchema.pre('save', function(next){
 
  if(!this.isModified('password'))
    return next();

  bcrypt.hash(this.password, 10, (err, hashPass) => {
    if(err)
      return next(err);
    this.password = hashPass;
    next();
  });

});

userSchema.methods.comparePassword = function (password, cb){
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if(err)
      return next(err);
    else{
      if(!isMatch)
        return cb(null, isMatch);
      else
        return cb(null, this)
    }
  });
}

const Users = mongoose.model('Users', userSchema);
module.exports = Users;