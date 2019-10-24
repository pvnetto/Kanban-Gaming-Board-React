import * as firebase from 'firebase';

export default class ProjectDAO {

    constructor(firestoreDB) {
        this._firestoreDB = firestoreDB;
    }

    getProjectRef = async (projectId) => {
        return await this._firestoreDB
            .collection('projects').doc(projectId);
    }

    // Enables the client-side app to add chat messages to the database
    insertProject = async (project) => {
        // Receives a project as parameter and adds two extra fields:
        // author and createdAt, before adding it to the database
        const createdAt = new Date();
        const roles = {};
        roles[`${firebase.auth().currentUser.email}`] = "owner";

        const insertedRef = await this._firestoreDB.collection('projects').add({
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

        // Deletes the project
        return await projectRef.delete();
    }

    updateProject = async (newProject) => {
        let projectId = newProject.id;
        // IDs should not be directly saved in firestore documents
        delete newProject.id;

        const insertedRef = await this._firestoreDB
            .collection('projects').doc(projectId);

        await insertedRef.update({ ...newProject });
        return await insertedRef.get().then(doc => doc.exists ? { id: doc.id, ...doc.data() } : null);
    }

    insertProjectContributor = async (projectId, user) => {
        if (user) {
            const projectRef = await this._firestoreDB
                .collection('projects').doc(projectId);

            // Using an object with dot notation to update the object allows you to update an object without overwriting its data
            const newRoles = {};
            newRoles[`roles.${user.email}`] = 'contributor';

            projectRef.update({
                ...newRoles
            });

            return await projectRef.get().then(doc => doc.exists ? { id: doc.id, ...doc.data() } : null);
        }
        else {
            throw new ReferenceError("User not found :(");
        }
    }

    fetchProjectsByUserEmail = async (userEmail) => {
        let projects = [];
        const projectsRef = await this._firestoreDB.collection("projects");

        // Fetches projects where user is the owner
        await projectsRef.where(new firebase.firestore.FieldPath('roles', userEmail), "==", "owner").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                projects.push({ id: doc.id, ...doc.data() });
            });
        });

        // Fetches projects where user is a contributor
        await projectsRef.where(new firebase.firestore.FieldPath('roles', userEmail), "==", "contributor").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                projects.push({ id: doc.id, ...doc.data() });
            });
        });

        return projects;
    }

}