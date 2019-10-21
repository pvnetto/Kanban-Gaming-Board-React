import * as firebase from 'firebase';

export default class DesignLogDAO {

    constructor(firestoreDB) {
        this._firestoreDB = firestoreDB;
    }

    insertDesignLog = async (projectRef, designLog) => {
        const logsRef = await projectRef
            .collection('logs');

        const createdAt = new Date();
        const author = firebase.auth().currentUser.displayName;
        const newBoardRef = await logsRef.add({ ...designLog, author, createdAt });
        const newBoardData = await newBoardRef.get().then(doc => doc.exists ? doc.data() : null);

        return { id: newBoardRef.id, ...newBoardData };
    }

    removeDesignLog = async (projectRef, designLogId) => {
        const logRef = await projectRef
            .collection('logs').doc(designLogId);

        return await logRef.delete();
    }

    removeAllDesignLogsFromProject = async (projectRef) => {
        // Deletes all design logs before deleting the project
        return await projectRef.collection('logs').get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete();
                });
            });
    }

    setDesignLogListener = async (projectRef, listener) => {
        return await projectRef
            .collection('logs').onSnapshot(this._delegateListener(listener));
    }

    _delegateListener = (listener) => {
        return (snapshot) => {
            let items = [];
            snapshot.forEach(doc => {
                items.push(doc.exists ? { id: doc.id, ...doc.data() } : null);
            });

            listener(items);
        }
    }

}