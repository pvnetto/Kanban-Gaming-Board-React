import auth0 from 'auth0-js';


export default class Auth0Client {
    constructor() {
        this._idToken = null;
        this._accessToken = null;
        this._profile = null;

        console.log(process.env);

        // Initializes the auth0 library with the developer's auth0 credentials (found in auth0 dashboard)
        this._auth0Client = new auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,             // Declared in .env
            clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,        // Declared in .env
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,  // Declared in .env
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,         // The audience for an auth0 secured API must be the same as APIs > 'api_name' > Identifier
            responseType: "token id_token",                         // token: Used to make API calls, id_token: used for identification by openid
            scope: 'openid profile email'
        });

    }

    getIdToken = () => this._idToken;

    getAccessToken = () => this._accessToken;

    getProfile = () => this._profile;

    loginWithGoogle = () => this._auth0Client.authorize({ connection: 'google-oauth2', });

    loginWithTwitter = () => this._auth0Client.authorize({ connection: 'twitter', });

    loginWithFacebook = () => this._auth0Client.authorize({ connection: 'facebook', })

    // Parses the URL of the current page to check if there are any tokens on it
    handleCallback = () => new Promise((resolve, reject) => {
        this._auth0Client.parseHash(async (err, authResult) => {
            window.location.hash = '';

            if (err) {
                console.log("error");
                return reject(err);
            }

            if (!authResult || !authResult.idToken || !authResult.accessToken) {
                console.log("no result");
                return resolve(false);
            }

            this.setSession(authResult);

            return resolve(true);
        });
    });

    handleSilentAuthentication = () => new Promise((resolve, reject) => {
        // Performs silent authentication by checking if there's an existing session
        this._auth0Client.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                return resolve(true);
            }

            return resolve(false);
        });
    })

    setSession = (authResult) => {
        this._idToken = authResult.idToken;
        this._accessToken = authResult.accessToken;
        this._profile = authResult.idTokenPayload;
    }

    // Initializes the authentication process by redirecting users to auth0,
    // so they can choose an authentication method
    signIn = () => this._auth0Client.authorize();

    // Removes the current user session by cleaning up idToken and profile
    signOut = async () => {
        this._idToken = null;
        this._accessToken = null;
        this._profile = null;

        await this._auth0Client.logout({ returnTo: process.env.REACT_APP_AUTH0_LOGOUT_URL });
    }
}
