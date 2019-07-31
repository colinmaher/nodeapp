const okta = require('@okta/okta-sdk-nodejs');
const key = require('../../secrets').oktaMembershipKey;

const client = new okta.Client({
  orgUrl: 'https://dev-120993.okta.com',
  token: key
});

module.exports = client;