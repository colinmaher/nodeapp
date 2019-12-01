const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: process.env.OKTA_URL + '/oauth2/default' // required
});

function authenticationRequired(req, res, next) {
    // console.log(req)
    const authHeader = req.headers.authorization.toString() || '';
    console.log(authHeader)
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
        res.status(401);
        return next('Unauthorized');
    }

    const accessToken = match[1];

    return oktaJwtVerifier.verifyAccessToken(accessToken, 'api://default')
        .then((jwt) => {
            req.jwt = jwt;
            next();
        })
        .catch((err) => {
            console.log(err)
            res.status(401).send(err.message);
        });
}

module.exports = authenticationRequired