import UserDAO from '../dao/firebase-user-dao';


export default class UserService {

    constructor(firestoreDB) {
        this._firestoreDB = firestoreDB;

        this.userDAO = new UserDAO(this._firestoreDB);
    }

    insertUserWithAuth0Profile = async (auth0Profile) => {
        const newUser = {
            email: auth0Profile.email,
            name: auth0Profile.name,
            avatarUrl: auth0Profile.picture,
            identities: [auth0Profile.sub]
        };

        // Checks if the user already exists
        let existingUser = await this.fetchUserByEmail(newUser.email);
        if (existingUser) {
            if (existingUser.identities.includes(auth0Profile.sub)) {
                // If the user exists and already has this identity, it doesn't need to be modified
                return existingUser;
            }
            else {
                // If the user exists and still doesn't have this identity, it's updated
                existingUser.identities.push(auth0Profile.sub);
                return await this.userDAO.insertUser(existingUser);
            }
        }

        return await this.userDAO.insertUser(newUser);
    }

    fetchUserByEmail = async (userEmail) => {
        return await this.userDAO.fetchUserByEmail(userEmail);
    }

}