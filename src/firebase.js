import firebase from 'firebase';

export default class Firebase {
    constructor() {
        // Initializes firebase
        firebase.initializeApp({
            apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
            authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
            projectId: `${process.env.REACT_APP_PROJECT_ID}`,
        });

        // Initializes and configures firestore
        this._messagesDb = firebase.firestore();

        this._messagesDb.settings({
            timestampsInSnapshots: true
        });
    }

    // Enables the client-side app to add chat messages to the database
    insertProject = async (project) => {
        // Receives a project as parameter and adds two extra fields:
        // author and createdAt, before adding it to the database
        const createdAt = new Date();
        const author = firebase.auth().currentUser.displayName;

        const insertedRef = await this._messagesDb.collection('projects').add({
            ...project,
            author,
            createdAt
        });

        const insertedData = await insertedRef.get().then(doc => doc.exists ? doc.data() : null);

        return { id: insertedRef.id, ...insertedData };
    }

    fetchProjects = async () => {
        let projects = [];
        await this._messagesDb.collection("projects").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                projects.push({ id: doc.id, ...doc.data() });
            });
        });

        return projects;
    }

    insertBoard = async (projectId, board) => {
        const createdAt = new Date();
        const author = firebase.auth().currentUser.displayName;

        const project = await this._messagesDb.collection('projects').doc(projectId);
        const newBoardRef = await project.collection('boards').add({ ...board, author, createdAt });
        const newBoardData = await newBoardRef.get().then(doc => doc.exists ? doc.data() : null);

        return { id: newBoardRef.id, ...newBoardData };
    }

    fetchBoardsByProject = async (projectId) => {
        let boards = [];

        const project = await this._messagesDb.collection('projects').doc(projectId);
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

        const newTaskRef = await this._messagesDb
            .collection('projects')
            .doc(projectId)
            .collection('boards')
            .doc(boardId)
            .collection('tasks')
            .add({ ...task, author, createdAt });

        const newTaskData = await newTaskRef.get().then(doc => doc.exists ? doc.data() : null);

        return { id: newTaskRef.id, ...newTaskData };
    }

    insertTaskToBacklog = async (projectId, task) => {
        const createdAt = new Date();
        const author = firebase.auth().currentUser.displayName;

        const newTaskRef = await this._messagesDb
            .collection('projects')
            .doc(projectId)
            .collection('backlog')
            .add({ ...task, author, createdAt });

        const newTaskData = await newTaskRef.get().then(doc => doc.exists ? doc.data() : null);

        return { id: newTaskRef.id, ...newTaskData };
    }

    fetchTasksFromBoard = async (projectId, boardId) => {
        let tasks = [];

        const tasksRef = await this._messagesDb
            .collection('projects')
            .doc(projectId)
            .collection('boards')
            .doc(boardId)
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

        const tasksRef = await this._messagesDb
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


    getCurrentUser = () => firebase.auth().currentUser;

    updateProfile = async (profile) => {
        if (!firebase.auth().currentUser) {
            return;
        }

        await firebase.auth().currentUser.updateProfile({
            displayName: profile.name,
            photoURL: profile.picture
        });
    }

    // Ends firebase session
    signOut = async () => await firebase.auth().signOut();

    // Adds a callback to the state listener that will be called whenever the authentication state changes
    setAuthStateListener = (listener) => firebase.auth().onAuthStateChanged(listener);

    // Adds a callback to the messages collection that is called whenever it's changed
    setProjectsListener = (listener) => this._messagesDb.collection('projects').orderBy('createdAt').limit(10).onSnapshot(listener);

    // Receives a custom token generated by the server and uses it to authenticate with Firebase
    setToken = async (token) => await firebase.auth().signInWithCustomToken(token);
}