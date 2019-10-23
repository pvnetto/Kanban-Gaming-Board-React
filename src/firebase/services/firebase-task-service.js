import ProjectDAO from '../dao/firebase-project-dao';
import BoardDAO from '../dao/firebase-board-dao';
import TaskDAO from '../dao/firebase-task-dao';


export default class TaskService {

    constructor(firestoreDB) {
        this._firestoreDB = firestoreDB;

        this.projectDAO = new ProjectDAO(this._firestoreDB);
        this.boardDAO = new BoardDAO(this._firestoreDB);
        this.taskDAO = new TaskDAO(this._firestoreDB);
    }

    insertTaskToBoard = async (projectId, boardId, task) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);
        const boardRef = await this.boardDAO.getBoardRef(projectRef, boardId);

        return await this.taskDAO.insertTaskToBoard(boardRef, task);
    }

    updateBoardTasks = async (projectId, boardId, tasks) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);
        const boardRef = await this.boardDAO.getBoardRef(projectRef, boardId);

        return await this.taskDAO.updateBoardTasks(boardRef, tasks);
    }

    removeTaskFromBoard = async (projectId, boardId, task) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);
        const boardRef = await this.boardDAO.getBoardRef(projectRef, boardId);

        return await this.taskDAO.removeTaskFromBoard(boardRef, task);
    }

    fetchTasksFromBoard = async (projectId, boardId) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);
        const boardRef = await this.boardDAO.getBoardRef(projectRef, boardId);

        return await this.taskDAO.fetchTasksFromBoard(boardRef);
    }

    insertTaskToBacklog = async (projectId, task) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);

        return await this.taskDAO.insertTaskToBacklog(projectRef, task);
    }

    updateBacklogTasks = async (projectId, tasks) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);

        return await this.taskDAO.updateBacklogTasks(projectRef, tasks);
    }

    removeTaskFromBacklog = async (projectId, task) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);

        return await this.taskDAO.removeTaskFromBacklog(projectRef, task);
    }

    fetchTasksFromBacklog = async (projectId) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);

        return await this.taskDAO.fetchTasksFromBacklog(projectRef);
    }

    setBoardTasksListener = async (projectId, boardId, listener) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);
        const boardRef = await this.boardDAO.getBoardRef(projectRef, boardId);

        return await this.taskDAO.setBoardTasksListener(boardRef, listener);
    }

    setBacklogTasksListener = async (projectId, listener) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);
        return await this.taskDAO.setBacklogTasksListener(projectRef, listener);
    }

}