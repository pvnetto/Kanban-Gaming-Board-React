const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const firebaseAdmin = require('firebase-admin');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

require('dotenv').config();

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3001;

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
    console.error(`Node cluster master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
    });

}
else {
    const app = express();

    // Configuring cors to make the server accept requests from different origins
    app.use(cors());
    // app.use('/', express.static(path.join(__dirname, '')));
    // Priority serve any static files.
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

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
    const serviceAccount = require('../firebase/firebase-key');

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

    // All remaining requests return the React app, so it can handle routing.
    app.get('*', function (request, response) {
        response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });

    app.listen(PORT, () => console.log("Server running on localhost: 3001"));
}