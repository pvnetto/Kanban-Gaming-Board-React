export default class UserDAO {

    constructor(firestoreDB) {
        this._firestoreDB = firestoreDB;
    }

    insertUser = async (user) => {
        if (user) {
            const userRef = await this._firestoreDB.collection('users').doc(user.email);
            await userRef.set({ ...user });

            const insertedData = await userRef.get().then(doc => doc.exists ? doc.data() : null);

            return { ...insertedData };
        }
    }

    fetchUserByEmail = async (userEmail) => {
        const usersRef = await this._firestoreDB.collection("users");
        const userRef = await usersRef.doc(userEmail);

        let user = await userRef.get().then(doc => doc.exists ? doc.data() : null);

        return user;
    }

}