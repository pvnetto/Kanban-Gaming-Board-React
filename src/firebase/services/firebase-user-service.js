import UserDAO from '../dao/firebase-user-dao';


export default class UserService {

    constructor(firestoreDB) {
        this._firestoreDB = firestoreDB;

        this.userDAO = new UserDAO(this._firestoreDB);
    }

    insertUser = async (user) => {
        return await this.userDAO.insertUser(user);
    }

    fetchUserByEmail = async (userEmail) => {
        return await this.userDAO.fetchUserByEmail(userEmail);
    }

}