const app = require('express')
const mongoose = require('mongoose')
const router = app.Router();
const oktaClient = require('../lib/oktaClient');
const mongoose = require('mongoose');
const UserModel = require('../models/userModel').UserModel

/* Create a new User (register). */

const UserModel = require('../models/userModel').UserModel

async function createMongoUser(req, user) {
  const db = mongoose.connection;
  console.log(user)
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("connected to mongo")
  });

  if (!req.body) return res.sendStatus(400);
  const info = req.body.userInfo;
  // name: String,
  // displayName: String,
  // id: String,
  // email: String,
  if (info) {
    const processedUser = { displayName: info.firstName + info.lastName, oktaId: info.sub, firstName: info.firstName, lastName: info.lastName, email: info.email }
    console.log(processedUser)
    await UserModel.create(processedUser);
  }


  else { return res.status(400).send("Authentication error please sign in.") }
}

/* Create a new User (register). */
router.post('/', async (req, res) => {
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
      await createMongoUser(user).catch()
      res.status(201);
      res.send(user);
    })
    .catch(err => {
      console.log(err)
      res.status(400);
      res.send(err);
    });
});

module.exports = router;