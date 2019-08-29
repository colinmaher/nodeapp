const app = require('express')
const router = app.Router();
const oktaClient = require('../lib/oktaClient');
const mongoose = require('mongoose');
const UserModel = require('../models/userModel').UserModel

/* Create a new User (register). */
router.post('/', async (req, res, next) => {
  console.log(req.body)
  const db = mongoose.connection;
  // console.log(db)
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    // we're connected!
    console.log("connected to mongo")
  });
  if (!req.body) return res.sendStatus(400);
  const newUser = {
    profile: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      login: req.body.email
    },
    credentials: {
      password: {
        value: req.body.password
      }
    }
  };

  await oktaClient
    .createUser(newUser)
    .then(async user => {
      console.log(user)
      await UserModel.create({
        firstName: user.firstName,
        lastName: user.lastName,
        oktaId: user.sub,
        username: user.email,
        email: user.email
      })
        .catch(err => {
          console.log(err)
          res.status(400)
          res.send(err)
        })
      res.status(201);
      res.send(user);
    })
    .catch(err => {
      res.status(400);
      res.send(err);
    });
});

module.exports = router;