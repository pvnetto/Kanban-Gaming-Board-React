import ProjectDAO from '../dao/firebase-project-dao';
import BoardDAO from '../dao/firebase-board-dao';
import TaskDAO from '../dao/firebase-task-dao';
import DesignLogDAO from '../dao/firebase-design-log-dao';


export default class ProjectService {

    constructor(firestoreDB) {
        this._firestoreDB = firestoreDB;

        this.projectDAO = new ProjectDAO(this._firestoreDB);
        this.boardDAO = new BoardDAO(this._firestoreDB);
        this.taskDAO = new TaskDAO(this._firestoreDB);
        this.designLogDAO = new DesignLogDAO(this._firestoreDB);
    }

    // Enables the client-side app to add chat messages to the database
    insertProject = async (project) => {
        return await this.projectDAO.insertProject(project);
    }

    removeProject = async (projectId) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);

        // Deletes all boards, tasks, backlog and design logs before deleting the project
        let boardRefs = await this.boardDAO.fetchBoardRefsByProject(projectRef);
        await boardRefs.forEach(boardRef => this.taskDAO.removeAllTasksFromBoard(boardRef));
        await this.boardDAO.removeBoards(boardRefs);
        await this.taskDAO.removeAllTasksFromBacklog(projectRef);
        await this.designLogDAO.removeAllDesignLogsFromProject(projectRef);

        // Deletes the project
        return await projectRef.delete();
    }

    updateProject = async (newProject) => {
        return await this.projectDAO.updateProject(newProject);
    }

    insertProjectContributor = async (projectId, contributorEmail) => {
        let newContributor = await this.userDAO.fetchUserByEmail(contributorEmail);
        return await this.projectDAO.insertProjectContributor(projectId, newContributor);
    }

    fetchProjects = async (userID) => {
        return await this.projectDAO.fetchProjectsByUserID(userID);
    }

}