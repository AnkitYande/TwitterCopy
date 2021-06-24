const router = require('express').Router();
const JWT = require('jsonwebtoken');
const passport = require('passport');
const passportConfig = require('../passport');
let User = require('../models/user.model');

const signToken = userID => {
  return JWT.sign({
    iss: "TwitterClone",
    sub: userID
  }, "Chewycheaker", { expiresIn: "1h" });
}

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    username,
    password
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
    else {
      const newUser = new User({ username, password });

      newUser.save(err => {
        if (err)
          res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        else
          res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false } });
      });
    }
  });
});

router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  if (req.isAuthenticated()) {
    const { _id, username } = req.user;
    const token = signToken(_id);
    res.cookie('access_token', token, { httpOnly: true, sameSite: true });
    res.status(200).json({ isAuthenticated: true, user: { username } });
  }
});

router.route('/verify').post((req, res) => {
  User.findOne({ username: req.body.username }, function (err, user) {
    if(err){
      res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
    }else if(!user){
      res.json("ERROR: No user found with this username")
    }else{
      user.comparePassword(req.body.password, function (err, isMatch) {
        if(isMatch == false)
          res.json("ERROR: invalid password")
        else
          res.json(isMatch);
      });
    }

  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('access_token');
  res.json({ user: { username: "", role: "" }, success: true });
});

router.get('/auth', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { username, role } = req.user;
  res.status(200).json({ isAuthenticated: true, user: { username, role } });
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get/:username').get((req, res) => {
  User.findOne({ username: req.params.username })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/like').put((req, res) => {
  const username = req.body.username;
  const tweetID = req.body.tweetID;
  User.findOneAndUpdate({ username: username }, { $push: { likedTweets: tweetID } })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));

});
router.route('/unlike').put((req, res) => {
  const username = req.body.username;
  const tweetID = req.body.tweetID;
  User.findOneAndUpdate({ username: username }, { $pull: { likedTweets: tweetID } })
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;