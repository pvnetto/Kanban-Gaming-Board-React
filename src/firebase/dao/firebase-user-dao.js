export default class UserDAO {

    constructor(firestoreDB) {
        this._firestoreDB = firestoreDB;
    }

    insertUser = async (user) => {
        if (user) {
            const userRef = await this._firestoreDB.collection('users').doc(user.uid);
            await userRef.set({
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                avatarUrl: user.photoURL
            });

            const insertedData = await userRef.get().then(doc => doc.exists ? doc.data() : null);

            return { id: userRef.id, ...insertedData };
        }
    }

    fetchUserByEmail = async (userEmail) => {
        let user;

        const usersRef = await this._firestoreDB.collection("users");
        await usersRef.where(`email`, "==", userEmail).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                user = { id: doc.id, ...doc.data() };
            });
        });

        return user;
    }

}