const app = require('express')
const mongoose = require('mongoose')
const router = app.Router();
const oktaClient = require('../lib/oktaClient');
const UserModel = require('../models/userModel').UserModel

async function createMongoUser(res, user) {
  // const db = mongoose.connection;
  // // console.log(user)
  // db.on('error', console.error.bind(console, 'connection error:'));
  // db.once('open', function () {
  //   console.log("connected to mongo")
  // });

  if (user) {
    const processedUser = {
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      oktaId: user.id,
      username: user.profile.login,
      email: user.profile.email
    }
    // console.log(processedUser)
    try {
      await UserModel.create(processedUser)
      return
    }
    catch (err) {
      throw Error(err)
    }
  }
  return
}

/* Create a new User (register). */
router.post('/', async (req, res) => {
  // console.log(req.body)
  // if (req.body === undefined) return res.sendStatus(400);
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


  try {
    const user = await oktaClient.createUser(newUser)
    console.log(user)
    await createMongoUser(res, user)
    res.status(200).send( user )
  }
  catch (err) {
    console.error(err)
    res.status(400).send(err);
  }
});

module.exports = router;