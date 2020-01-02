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

    setBoardTasksListener = async (projectId, boardId, listener) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);
        const boardRef = await this.boardDAO.getBoardRef(projectRef, boardId);

        return await this.taskDAO.setBoardTasksListener(boardRef, listener);
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

    setBacklogTasksListener = async (projectId, listener) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);
        return await this.taskDAO.setBacklogTasksListener(projectRef, listener);
    }

    fetchAllTasksFromProject = async (projectId) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);
        const boardRefs = await this.boardDAO.fetchBoardRefsByProject(projectRef);
        let taskData = this.taskDAO.getEmptyBoardData();

        const boardPromises = boardRefs.map(async (boardRef) => {
            const boardTasks = await this.taskDAO.fetchTasksFromBoard(boardRef);
            Object.keys(boardTasks).forEach(key => {
                taskData[key].push(...boardTasks[key]);
            });
        });
        await Promise.all(boardPromises);

        const backlogTasks = await this.taskDAO.fetchTasksFromBacklog(projectRef);
        Object.keys(backlogTasks).forEach(key => {
            if (!taskData[key]) {
                taskData[key] = [];
            }
            taskData[key].push(...backlogTasks[key])
        });

        return taskData;
    }

}