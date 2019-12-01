const okta = require('@okta/okta-sdk-nodejs');
require('dotenv').config()

const client = new okta.Client({
  orgUrl: process.env.OKTA_URL,
  token: process.env.OKTAMEMBERSHIPKEY
});

module.exports = client;