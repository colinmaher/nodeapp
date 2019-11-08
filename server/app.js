'use strict'
const express = require('express')

const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
// const fs = require('fs')
// const passport = require('passport')
const cors = require('cors')
const mongoose = require('mongoose')
const errorHandler = require('errorhandler')

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const isProduction = process.env.NODE_ENV === 'production'

const helmet = require('helmet')
const router = express.Router()
const redis = require("redis")
const morgan = require('morgan')

if (isProduction && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  //Configure app
  const app = express()
  app.use(cors())
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use(helmet())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
    
  // connect db
  //Configure mongoose's promise to global promise
  mongoose.promise = global.Promise
  if (!isProduction) {
    mongoose.set('debug', true)
    app.use(errorHandler())
    app.use(morgan('dev'))
    require('dotenv').config()

    //Connect db
    mongoose.connect('mongodb://localhost/twtr', { useNewUrlParser: true })
  }
  else {
    app.use(morgan('combined'))
    console.log(process.env.MONGODB_URI)
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  }

  //Configure Redis session store

  const client = redis.createClient(6380, process.env.REDISCACHEHOSTNAME,
    { auth_pass: process.env.REDISCACHEKEY, tls: { servername: process.env.REDISCACHEHOSTNAME } })

  const options = {
    client: client
  }
  const RedisStore = require('connect-redis')(session)

  app.use(session({
    store: new RedisStore(options),
    secret: process.env.SESSIONSECRET,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
  }))

  app.use(router)

  app.use((req, res, next) => {
    // console.log(req.session)
    // console.log(req.sessionID)
    next()
  })

  app.get("/health", function (req, res) {
    res.status(200).send()
  })


  app.use('/api/', router)
  app.use(require('./api/routes'))

  //Error handlers & middlewares
  if (!isProduction) {
    app.use((req, res, err) => {
      res.status(err.status || 500)

      res.json({
        errors: {
          message: err.message,
          error: err,
        },
      })
    })
  }

  app.use((req, res, err) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    })
  })

  app.listen(process.env.PORT, () => console.log('Server running on port ' + process.env.PORT))

}
