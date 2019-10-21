import * as firebase from 'firebase';

export default class ProjectDAO {

    constructor(firestoreDB) {
        this.firestoreDB = firestoreDB;
    }

    getProjectRef = async (projectId) => {
        return await this.firestoreDB
            .collection('projects').doc(projectId);
    }

    // Enables the client-side app to add chat messages to the database
    insertProject = async (project) => {
        // Receives a project as parameter and adds two extra fields:
        // author and createdAt, before adding it to the database
        const createdAt = new Date();
        const roles = {};
        roles[`${firebase.auth().currentUser.uid}`] = "owner";

        const insertedRef = await this.firestoreDB.collection('projects').add({
            ...project,
            createdAt,
            roles
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

        // Deletes all design logs before deleting the project
        await projectRef.collection('logs').get().then((querySnapshot) => {
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

        const insertedRef = await this.firestoreDB
            .collection('projects').doc(projectId);

        await insertedRef.update({ ...newProject });
        return await insertedRef.get().then(doc => doc.exists ? { id: doc.id, ...doc.data() } : null);
    }

    insertProjectContributor = async (projectId, user) => {
        if (user) {
            const projectRef = await this.firestoreDB
                .collection('projects').doc(projectId);

            // Using an object with dot notation to update the object allows you to update an object without overwriting its data
            const newRoles = {};
            newRoles[`roles.${user.id}`] = 'contributor';

            projectRef.update({
                ...newRoles
            });

            return await projectRef.get().then(doc => doc.exists ? { id: doc.id, ...doc.data() } : null);
        }
        else {
            throw new ReferenceError("User not found :(");
        }
    }

    fetchProjectsByUserID = async (userID) => {
        let projects = [];
        const projectsRef = await this.firestoreDB.collection("projects");

        // Fetches projects where user is the owner
        await projectsRef.where(`roles.${userID}`, "==", "owner").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                projects.push({ id: doc.id, ...doc.data() });
            });
        });

        // Fetches projects where user is a contributor
        await projectsRef.where(`roles.${userID}`, "==", "contributor").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                projects.push({ id: doc.id, ...doc.data() });
            });
        });

        return projects;
    }

}