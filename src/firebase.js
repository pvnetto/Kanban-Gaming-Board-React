import firebase from 'firebase';

export default class Firebase {
    constructor() {
        // Initializes firebase
        firebase.initializeApp({
            apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
            authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
            projectId: `${process.env.REACT_APP_PROJECT_ID}`,
        });

        // Sets up authentication callback
        firebase.auth().onAuthStateChanged(this.insertUser);

        // Initializes and configures firestore
        this._kanbanDB = firebase.firestore();

        this._kanbanDB.settings({
            timestampsInSnapshots: true
        });
    }

    // Ends firebase session
    signOut = async () => await firebase.auth().signOut();

    // Receives a custom token generated by the server and uses it to authenticate with Firebase
    setToken = async (token) => await firebase.auth().signInWithCustomToken(token);

    // Adds a callback to the state listener that will be called whenever the authentication state changes
    setAuthStateListener = (listener) => firebase.auth().onAuthStateChanged(listener);

    getCurrentUser = () => firebase.auth().currentUser;

    updateProfile = async (profile) => {
        if (!firebase.auth().currentUser) {
            return;
        }

        await firebase.auth().currentUser.updateProfile({
            displayName: profile.name,
            photoURL: profile.picture,
        });

        await firebase.auth().currentUser.updateEmail(profile.email);
    }

    insertUser = async (user) => {
        if (user) {
            const userRef = await this._kanbanDB.collection('users').doc(user.uid);
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

    // Enables the client-side app to add chat messages to the database
    insertProject = async (project) => {
        // Receives a project as parameter and adds two extra fields:
        // author and createdAt, before adding it to the database
        const createdAt = new Date();
        const author = firebase.auth().currentUser.displayName;

        const insertedRef = await this._kanbanDB.collection('projects').add({
            ...project, author, createdAt
        });

        const insertedData = await insertedRef.get().then(doc => doc.exists ? doc.data() : null);

        return { id: insertedRef.id, ...insertedData };
    }

    removeProject = async (projectId) => {
        const projectRef = await this._kanbanDB
            .collection('projects').doc(projectId);

        // Deletes all boards before deleting the project
        await projectRef.collection('boards').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this._deleteBoardRef(doc.ref);
            });
        });

        // Deletes all backlog tasks before deleting the project
        await projectRef.collection('backlog').get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                doc.ref.delete();
            });
        });

        // Deletes the project
        return await projectRef.delete();
    }

    updateProject = async (newProject) => {
        let projectId = newProject.id;
        // IDs should not be directly saved in firestore documents
        delete newProject.id;

        const insertedRef = await this._kanbanDB
            .collection('projects').doc(projectId);

        await insertedRef.update({ ...newProject });
        return await insertedRef.get().then(doc => doc.exists ? { id: doc.id, ...doc.data() } : null);
    }

    fetchProjects = async () => {
        let projects = [];
        await this._kanbanDB.collection("projects").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                projects.push({ id: doc.id, ...doc.data() });
            });
        });

        return projects;
    }

    insertBoard = async (projectId, board) => {
        const createdAt = new Date();
        const author = firebase.auth().currentUser.displayName;

        const project = await this._kanbanDB.collection('projects').doc(projectId);
        const newBoardRef = await project.collection('boards').add({ ...board, author, createdAt });
        const newBoardData = await newBoardRef.get().then(doc => doc.exists ? doc.data() : null);

        return { id: newBoardRef.id, ...newBoardData };
    }

    removeBoard = async (projectId, boardId) => {
        const boardRef = await this._kanbanDB
            .collection('projects').doc(projectId)
            .collection('boards').doc(boardId);

        return await this._deleteBoardRef(boardRef);
    }

    _deleteBoardRef = async (boardRef) => {
        const tasksRef = await boardRef.collection('tasks');

        // Deletes all tasks from board
        await tasksRef.get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                doc.ref.delete();
            });
        });

        // Deletes the board
        return await boardRef.delete();
    }

    fetchBoardsByProject = async (projectId) => {
        let boards = [];

        const project = await this._kanbanDB.collection('projects').doc(projectId);
        await project.collection('boards').get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                boards.push({ id: doc.id, ...doc.data() });
            })
        });

        return boards;
    }

    insertTaskToBoard = async (projectId, boardId, task) => {
        const createdAt = new Date();
        const author = firebase.auth().currentUser.displayName;

        const newTaskRef = await this._kanbanDB
            .collection('projects').doc(projectId)
            .collection('boards').doc(boardId)
            .collection('tasks').add({ ...task, author, createdAt });

        const newTaskData = await newTaskRef.get().then(doc => doc.exists ? doc.data() : null);

        return { id: newTaskRef.id, ...newTaskData };
    }

    removeTaskFromBoard = async (projectId, boardId, taskId) => {
        return await this._kanbanDB
            .collection('projects').doc(projectId)
            .collection('boards').doc(boardId)
            .collection('tasks').doc(taskId).delete();

    }

    removeTaskFromBacklog = async (projectId, taskId) => {
        return this._kanbanDB
            .collection('projects').doc(projectId)
            .collection('backlog').doc(taskId).delete();
    }

    insertTaskToBacklog = async (projectId, task) => {
        const createdAt = new Date();
        const author = firebase.auth().currentUser.displayName;

        const newTaskRef = await this._kanbanDB
            .collection('projects').doc(projectId)
            .collection('backlog').add({ ...task, author, createdAt });

        const newTaskData = await newTaskRef.get().then(doc => doc.exists ? doc.data() : null);

        return { id: newTaskRef.id, ...newTaskData };
    }

    fetchTasksFromBoard = async (projectId, boardId) => {
        let tasks = [];

        const tasksRef = await this._kanbanDB
            .collection('projects').doc(projectId)
            .collection('boards').doc(boardId)
            .collection('tasks');

        await tasksRef.get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                tasks.push({ id: doc.id, ...doc.data() });
            })
        });

        return tasks;
    }

    fetchTasksFromBacklog = async (projectId) => {
        let backlogTasks = [];

        const tasksRef = await this._kanbanDB
            .collection('projects')
            .doc(projectId)
            .collection('backlog');

        await tasksRef.get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                backlogTasks.push({ id: doc.id, ...doc.data() });
            })
        });

        return backlogTasks;
    }

    // Converts snapshot's list of docs to a list of items with doc data, so listeners don't have to deal directly with snapshots
    _delegateListener = (listener) => {
        return (snapshot) => {
            let items = [];
            snapshot.forEach(doc => {
                items.push(doc.exists ? { id: doc.id, ...doc.data() } : null);
            });

            listener(items);
        }
    }

    setBoardTasksListener = async (projectId, boardId, listener) => {
        return await this._kanbanDB
            .collection('projects').doc(projectId)
            .collection('boards').doc(boardId)
            .collection('tasks').onSnapshot(this._delegateListener(listener));
    }

    setBacklogTasksListener = async (projectId, listener) => {
        return await this._kanbanDB
            .collection('projects').doc(projectId)
            .collection('backlog').onSnapshot(this._delegateListener(listener));
    }
}