const router = require('express').Router();
let Tweet = require('../models/tweet.model');

router.route('/').get((req, res) => {
  Tweet.find()
    .then(tweets => res.json(tweets))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const message = req.body.message;

  const newTweet = new Tweet({
    username,
    message,
  });

  newTweet.save()
  .then(() => res.json('Tweet added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Tweet.findById(req.params.id)
    .then(tweet => res.json(tweet))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Tweet.findByIdAndDelete(req.params.id)
    .then(() => res.json('Tweet deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get/:username').get((req, res) => {
  Tweet.find({username: req.params.username})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
  
});

module.exports = router;