import auth0 from 'auth0-js';


export default class Auth0Client {
    constructor() {
        this._idToken = null;
        this._profile = null;

        // Initializes the auth0 library with the developer's auth0 credentials (found in auth0 dashboard)
        this._auth0Client = new auth0.WebAuth({
            domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
            audience: `${process.env.REACT_APP_AUTH0_API_AUDIENCE}`,
            clientID: `${process.env.REACT_APP_CLIENT_ID}`,
            redirectUri: `http://localhost:3000/workspace/dashboard`,
            responseType: `token id_token`,
            scope: 'openid profile'
        });
    }

    getIdToken = () => this._idToken;

    getProfile = () => this._profile;

    // Parses the URL of the current page to check if there are any tokens on it
    handleCallback = () => new Promise((resolve, reject) => {
        this._auth0Client.parseHash(async (err, authResult) => {
            window.location.hash = '';

            if (err) {
                console.log("error");
                return reject(err);
            }

            if (!authResult || !authResult.idToken) {
                console.log("no result");
                return resolve(false);
            }

            this._idToken = authResult.idToken;
            this._profile = authResult.idTokenPayload;

            return resolve(true);
        });
    });

    // Initializes the authentication process by redirecting users to auth0,
    // so they can choose an authentication method
    signIn = () => this._auth0Client.authorize();


    // Removes the current user session by cleaning up idToken and profile
    signOut = () => {
        this._idToken = null;
        this._profile = null;
    }
}
