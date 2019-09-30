const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const firebaseAdmin = require('firebase-admin');
const path = require('path');

require('dotenv').config();

// Initializing application with express
const app = express();

// Configuring cors to make the server accept requests from different origins
app.use(cors());
app.use('/', express.static(path.join(__dirname, '')));


// Middleware that verifies JSON web tokens sent from the client
const checkJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,       // Prevents attackers from requesting more than 5 times per minute
        jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
    }),

    // Validating the audience and issuer
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

    algorithm: ["RS256"]    // Must be equal to APIs > 'api_name' > Signing Algorithm
});


// Gets firebase-key JSON, which contains configuration from firebase
const serviceAccount = require('./firebase/firebase-key');

// Initializes firebase admin SDK with the credentials required above
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

// Handles get requests in the /firebase url. jwtCheck is passed
// as a parameter to ensure that the request checks if the user is authenticating
// through auth0
app.get('/firebase', checkJwt, async (req, res) => {
    const { sub: uid } = req.user;

    try {
        const firebaseToken = await firebaseAdmin.auth().createCustomToken(uid);
        res.json({ firebaseToken });
    }
    catch (err) {
        res.status(500).send({
            message: "Something went wrong acquiring a Firebase token.",
            error: err
        });
    }
});


app.listen(3001, () => console.log("Server running on localhost: 3001"));