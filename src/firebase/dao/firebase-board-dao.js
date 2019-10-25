import * as firebase from 'firebase';

export default class BoardDAO {

    constructor(firestoreDB) {
        this._firestoreDB = firestoreDB;
    }

    getBoardRef = async (projectRef, boardId) => {
        return await projectRef
            .collection('boards').doc(boardId);
    }

    insertBoard = async (projectRef, board) => {
        const createdAt = new Date();
        const author = firebase.auth().currentUser.displayName;

        const boardsRef = projectRef
            .collection('boards');

        const newBoardRef = await boardsRef.add({ ...board, author, createdAt });
        const newBoardData = await newBoardRef.get().then(doc => doc.exists ? doc.data() : null);

        return { id: newBoardRef.id, ...newBoardData };
    }

    removeBoard = async (projectRef, boardId) => {
        const boardRef = projectRef
            .collection('boards').doc(boardId);

        return await boardRef.delete();
    }

    removeBoard = async (boardRef) => {
        return await boardRef.delete();
    }

    removeBoards = async (boardRefs) => {
        boardRefs.forEach(boardRef => boardRef.delete());
    }

    fetchBoardsByProject = async (projectRef) => {
        let boards = [];

        await projectRef.collection('boards').get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                boards.push({ id: doc.id, ...doc.data() });
            })
        });

        return boards;
    }

    fetchBoardRefsByProject = async (projectRef) => {
        let boards = [];

        await projectRef.collection('boards').get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                boards.push(doc.ref);
            })
        });

        return boards;
    }

    fetchBoardRefsByProject = async (projectRef) => {
        let boards = [];

        await projectRef.collection('boards').get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                boards.push(doc.ref);
            })
        });

        return boards;
    }

}