import ProjectDAO from '../dao/firebase-project-dao';
import DesignLogDAO from '../dao/firebase-design-log-dao';


export default class DesignLogService {

    constructor(firestoreDB) {
        this._firestoreDB = firestoreDB;

        this.projectDAO = new ProjectDAO(this._firestoreDB);
        this.designLogDAO = new DesignLogDAO(this._firestoreDB);
    }

    insertDesignLog = async (projectId, designLog) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);

        return await this.designLogDAO.insertDesignLog(projectRef, designLog);
    }

    removeDesignLog = async (projectId, designLogId) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);

        return await this.designLogDAO.removeDesignLog(projectRef, designLogId);
    }

    setDesignLogListener = async (projectId, listener) => {
        const projectRef = await this.projectDAO.getProjectRef(projectId);

        return await this.designLogDAO.setDesignLogListener(projectRef, listener);
    }

}