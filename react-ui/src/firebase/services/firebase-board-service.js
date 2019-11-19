import ProjectDAO from '../dao/firebase-project-dao';
import BoardDAO from '../dao/firebase-board-dao';
import TaskDAO from '../dao/firebase-task-dao';


export default class BoardService {

    constructor(firestoreDB) {
        this._firestoreDB = firestoreDB;

        this.projectDAO = new ProjectDAO(this._firestoreDB);
        this.boardDAO = new BoardDAO(this._firestoreDB);
        this.taskDAO = new TaskDAO(this._firestoreDB);
    }

    insertBoard = async (projectId, board) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);
        return await this.boardDAO.insertBoard(projectRef, board);
    }

    removeBoard = async (projectId, boardId) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);
        const boardRef = await this.boardDAO.getBoardRef(projectRef, boardId);

        await this.taskDAO.removeAllTasksFromBoard(boardRef);

        return await this.boardDAO.removeBoard(boardRef);
    }

    fetchBoardsByProject = async (projectId) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);
        return await this.boardDAO.fetchBoardsByProject(projectRef);
    }

}