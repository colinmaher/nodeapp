const app = require('express')
const mongoose = require('mongoose')
const router = app.Router();
const oktaClient = require('../lib/oktaClient');
const UserModel = require('../models/userModel').UserModel

async function createMongoUser(req, user) {
  const db = mongoose.connection;
  console.log(user)
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("connected to mongo")
  });

  if (user) {
    const processedUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      oktaId: user.sub,
      username: user.email,
      email: user.email
    }
    console.log(processedUser)
    await UserModel.create(processedUser)
    .then(()=>{
      res.status(201).send(processedUser);
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send("Can't create user right now. Try again later.")
    });
  }


  else { res.status(400).send("Authentication error please sign in.") }
}

/* Create a new User (register). */
router.post('/', async (req, res) => {
  console.log(req.body)
  if (!req.body) return res.sendStatus(400);
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("connected to mongo")
  });
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
      await createMongoUser(user).catch((err) => console.log(err))
    })
    .catch(err => {
      console.log(err)
      res.status(400).send(err);
    });
});

module.exports = router;