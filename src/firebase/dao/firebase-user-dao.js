export default class UserDAO {

    constructor(firestoreDB) {
        this.firestoreDB = firestoreDB;
    }

    insertUser = async (user) => {
        if (user) {
            const userRef = await this.firestoreDB.collection('users').doc(user.uid);
            const userSet = await userRef.set({
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

        const usersRef = await this.firestoreDB.collection("users");
        await usersRef.where(`email`, "==", userEmail).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                user = { id: doc.id, ...doc.data() };
            });
        });

        return user;
    }

}