import * as firebase from 'firebase';

export default class TaskDAO {

    constructor(firestoreDB) {
        this.firestoreDB = firestoreDB;
    }

    insertTaskToBoard = async (boardRef, task) => {
        const tasksRef = await boardRef
            .collection('tasks').doc('tasks');

        const tasks = await this.fetchTasksFromBoard(boardRef);

        const createdAt = new Date();
        const author = firebase.auth().currentUser.displayName;
        let newTask = { ...task, author, createdAt }

        await tasksRef.set({
            ordered: [...tasks, { ...newTask }]
        });

        return newTask;
    }

    updateBoardTasks = async (boardRef, tasks) => {
        const tasksRef = await boardRef
            .collection('tasks').doc('tasks');

        await tasksRef.set({
            ordered: [...tasks]
        });

        return await tasksRef.get().then(doc => doc.exists ? [...doc.data().ordered] : []);
    }

    removeTaskFromBoard = async (boardRef, task) => {
        const tasksRef = await boardRef
            .collection('tasks').doc('tasks');

        return await tasksRef.update({
            ordered: firebase.firestore.FieldValue.arrayRemove({ ...task })
        });
    }

    removeAllTasksFromBoard = async (boardRef) => {
        const tasksRef = await boardRef
            .collection('tasks').doc('tasks');

        return await tasksRef.delete();
    }

    fetchTasksFromBoard = async (boardRef) => {
        const tasksRef = await boardRef
            .collection('tasks').doc('tasks');

        return await tasksRef.get().then(doc => doc.exists ? [...doc.data().ordered] : []);
    }

    insertTaskToBacklog = async (projectRef, task) => {
        const createdAt = new Date();
        const author = firebase.auth().currentUser.displayName;

        const tasksRef = await projectRef
            .collection('backlog').doc('tasks');

        const tasks = await this.fetchTasksFromBacklog(projectRef);

        let newTask = { ...task, author, createdAt }
        await tasksRef.set({
            ordered: [...tasks, { ...newTask }]
        });

        return newTask;
    }

    updateBacklogTasks = async (projectRef, tasks) => {
        const tasksRef = await projectRef
            .collection('backlog').doc('tasks');

        await tasksRef.set({
            ordered: [...tasks]
        });

        return await tasksRef.get().then(doc => doc.exists ? [...doc.data().ordered] : []);
    }

    removeTaskFromBacklog = async (projectRef, task) => {
        const tasksRef = await projectRef
            .collection('backlog').doc('tasks');

        return await tasksRef.update({
            ordered: firebase.firestore.FieldValue.arrayRemove({ ...task })
        });
    }

    removeAllTasksFromBacklog = async (projectRef) => {
        const tasksRef = await projectRef
            .collection('backlog').doc('tasks');

        return await tasksRef.delete();
    }

    fetchTasksFromBacklog = async (projectRef) => {
        const tasksRef = await projectRef
            .collection('backlog').doc('tasks');

        return await tasksRef.get().then(doc => doc.exists ? [...doc.data().ordered] : []);
    }

    setBoardTasksListener = async (boardRef, listener) => {
        return await boardRef
            .collection('tasks').onSnapshot(this._delegateTasksListener(listener));
    }

    setBacklogTasksListener = async (projectRef, listener) => {
        return await projectRef
            .collection('backlog').onSnapshot(this._delegateTasksListener(listener));
    }

    // Converts snapshot's list of docs to a list of items with doc data, so listeners don't have to deal directly with snapshots
    _delegateTasksListener = (listener) => {
        return (snapshot) => {
            let items = [];
            snapshot.forEach(doc => {
                items = doc.exists ? [...doc.data().ordered] : [];
            });

            listener(items);
        }
    }

}