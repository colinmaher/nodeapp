const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-120993.okta.com',
  token: process.env.OKTAMEMBERSHIPKEY
});

module.exports = client;