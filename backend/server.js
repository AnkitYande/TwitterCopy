const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const tweetsRouter = require('./routes/tweets');
const usersRouter = require('./routes/users');

// const userRouter = require('./routes/User');
// app.use('/user',userRouter);

app.use('/tweets', tweetsRouter);
app.use('/users', usersRouter);

app.use(cookieParser())
// userRouter.use(cookieParser())
app.use(express.json());

app.get('/getcookie', function(req, res) {
  var token = req.cookies['access_token'];
  if (token) {
      return res.send(token);        
  }
  return res.send('No cookie found');
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});