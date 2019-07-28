const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
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
const router = require('express').Router();
const secret = require('./secrets').secret;

//Configure our app
app.use(cors());
app.use(router);
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: secret, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session())
if(!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
// mongoose.connect('mongodb://localhost/');
// mongoose.set('debug', true);

app.use(function (req, res, next) {
  console.log(req.body);
  next()
});
app.use(require('./api/routes'));


//Error handlers & middlewares
if(!isProduction) {
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