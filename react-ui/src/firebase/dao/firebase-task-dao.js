import * as firebase from 'firebase';

import TaskStatus from '../../components/commons/TaskStatus';

export default class TaskDAO {

    constructor(firestoreDB) {
        this._firestoreDB = firestoreDB;
    }

    insertTaskToBoard = async (boardRef, task) => {
        const tasksRef = await boardRef
            .collection('tasks').doc('tasks');

        const tasks = await this.fetchTasksFromBoard(boardRef);
        const typeTasks = tasks[task.status] || [];

        const createdAt = new Date();
        const author = firebase.auth().currentUser.displayName;
        let newTask = { ...task, author, createdAt }

        let listName = newTask.status;
        await tasksRef.set({ [listName]: [...typeTasks, newTask] }, { merge: true });

        return newTask;
    }

    updateBoardTasks = async (boardRef, tasks) => {
        const tasksRef = await boardRef
            .collection('tasks').doc('tasks');

        await tasksRef.set(tasks);

        return await tasksRef.get().then(doc => this._getBoardData(doc));
    }

    removeTaskFromBoard = async (boardRef, task) => {
        const tasksRef = await boardRef
            .collection('tasks').doc('tasks');

        let listName = task.status;
        return await tasksRef.update({
            [listName]: firebase.firestore.FieldValue.arrayRemove({ ...task })
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

        return await tasksRef.get().then(doc => this._getBoardData(doc));
    }

    insertTaskToBacklog = async (projectRef, task) => {
        const tasksRef = await projectRef
            .collection('backlog').doc('tasks');

        const tasks = await this.fetchTasksFromBacklog(projectRef);
        const typeTasks = tasks[task.status] || [];

        const createdAt = new Date();
        const author = firebase.auth().currentUser.displayName;
        let newTask = { ...task, author, createdAt }

        let listName = newTask.status;
        await tasksRef.set({ [listName]: [...typeTasks, newTask] });

        return newTask;
    }

    updateBacklogTasks = async (projectRef, tasks) => {
        const tasksRef = await projectRef
            .collection('backlog').doc('tasks');

        await tasksRef.set(tasks);

        return await tasksRef.get().then(doc => this._getBacklogData(doc));
    }

    removeTaskFromBacklog = async (projectRef, task) => {
        const tasksRef = await projectRef
            .collection('backlog').doc('tasks');

        const listName = task.status;
        return await tasksRef.update({
            [listName]: firebase.firestore.FieldValue.arrayRemove({ ...task })
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

        return await tasksRef.get().then(doc => this._getBacklogData(doc));
    }

    setBoardTasksListener = async (boardRef, listener) => {
        return await boardRef
            .collection('tasks').onSnapshot(this._delegateTasksListener(listener, this._getBoardData, this._checkBoardData));
    }

    setBacklogTasksListener = async (projectRef, listener) => {
        return await projectRef
            .collection('backlog').onSnapshot(this._delegateTasksListener(listener, this._getBacklogData, this._checkBacklogData));
    }

    // Converts snapshot's list of docs to a list of items with doc data, so listeners don't have to deal directly with snapshots
    _delegateTasksListener = (listener, dataBuilder, dataChecker) => {
        return (snapshot) => {
            let taskData = {};

            snapshot.forEach(doc => {
                taskData = dataBuilder(doc);
            });

            taskData = dataChecker(taskData);

            listener(taskData);
        }
    }

    _getBoardData = (doc) => {
        let boardData = doc.exists ? Object.assign({}, doc.data()) : {};
        boardData = this._checkBoardData(boardData);
        return boardData;
    };

    getEmptyBoardData = () => (this._checkBoardData({}));

    // Checks if an object contains keys for all TaskStatus types
    _checkBoardData = (boardData) => {
        Object.values(TaskStatus).forEach(status => {
            if (status !== TaskStatus.BACKLOG && !boardData[status]) {
                boardData[status] = [];
            }
        });

        return boardData;
    }

    _getBacklogData = (doc) => {
        let backlogData = doc.exists ? Object.assign({}, doc.data()) : {};
        backlogData = this._checkBacklogData(backlogData);
        return backlogData;
    }

    _checkBacklogData = (backlogData) => {
        if (!backlogData[TaskStatus.BACKLOG]) {
            backlogData[TaskStatus.BACKLOG] = [];
        }

        return backlogData;
    };

}