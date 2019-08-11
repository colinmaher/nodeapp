const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
// const fs = require('fs');
// const passport = require('passport');
const cors = require('cors');
// const mongoose = require('mongoose');
const errorHandler = require('errorhandler');

//Configure mongoose's promise to global promise
// mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

//Initiate our app
const app = express();
require('dotenv').config()
const helmet = require('helmet');
const router = require('express').Router();
const redis = require("redis");
const client = redis.createClient(6380, process.env.REDISCACHEHOSTNAME,
    {auth_pass: process.env.REDISCACHEKEY, tls: {servername: process.env.REDISCACHEHOSTNAME}});
// const secret = require('./secrets').secret;


// Add your cache name and access key.

//Configure our app
app.use(helmet());
app.use(cors());
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const options = {
  client: client
}

const RedisStore = require('connect-redis')(session);
app.use(session({
  store: new RedisStore(options),
  secret: process.env.SESSIONSECRET,
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));
// app.use(express.static(path.join(__dirname, 'public')));

const morgan = require('morgan');
app.use(morgan('dev'));
// app.use(passport.initialize());
// app.use(passport.session())
if (!isProduction) {
  app.use(errorHandler());
}

app.get("/health", function (req, res) {
  res.status(200).send();
});

//Configure Mongoose
// mongoose.connect('mongodb://localhost/twtr');
// mongoose.set('debug', true);

app.use(function (req, res, next) {
  
  next()
});
app.use(require('./api/routes'));


//Error handlers & middlewares
if (!isProduction) {
  app.use((req, res, err) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((req, res, err) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(8000, () => console.log('Server running on http://localhost:8000/'));