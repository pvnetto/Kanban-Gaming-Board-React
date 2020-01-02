import { fetchBoardTasksSuccess, addTaskBoardSuccess, removeTaskBoardSuccess, boardPending, updateBoardTasksSuccess } from '../../components/contexts/tasks/board/board-actions';
import { fetchBacklogTasksSuccess, addTaskBacklogSuccess, removeTaskBacklogSuccess, backlogPending, updateTasksBacklogSuccess } from '../../components/contexts/tasks/backlog/backlog-actions';
import TaskStatus from '../../components/commons/TaskStatus';

export const fetchTasksFromBacklog = () => {
    return async (dispatch, getState) => {
        const { auth, boards } = getState();
        const taskService = auth.firebaseClient.taskService;

        dispatch(backlogPending())
        const tasks = await taskService.fetchTasksFromBacklog(boards.currentProject.id);
        dispatch(fetchBacklogTasksSuccess(tasks));
    }
}

export const addTaskToBacklog = (name, description, category) => {
    return async (dispatch, getState) => {
        const { auth, boards } = getState();
        const taskService = auth.firebaseClient.taskService;

        dispatch(backlogPending());
        const newTask = { id: generateTaskID(), name, description, category, status: TaskStatus.BACKLOG };
        taskService.insertTaskToBacklog(boards.currentProject.id, newTask);
        dispatch(addTaskBacklogSuccess(newTask));
    }
}

export const removeTaskFromBacklog = (task) => {
    return async (dispatch, getState) => {
        const { auth, boards } = getState();
        const taskService = auth.firebaseClient.taskService;

        dispatch(backlogPending());
        await taskService.removeTaskFromBacklog(boards.currentProject.id, task);
        dispatch(removeTaskBacklogSuccess(task.id));
    }
}

export const fetchTasksFromBoard = (boardId) => {
    return async (dispatch, getState) => {
        const { auth, boards } = getState();
        const taskService = auth.firebaseClient.taskService;

        dispatch(boardPending());
        const boardTasks = await taskService.fetchTasksFromBoard(boards.currentProject.id, boardId);
        dispatch(fetchBoardTasksSuccess(boardTasks));
    }
}

export const addTaskToBoard = (boardId, name, description, category) => {
    return async (dispatch, getState) => {
        const { auth, boards } = getState();
        const taskService = auth.firebaseClient.taskService;

        dispatch(boardPending());
        const newTask = { id: generateTaskID(), name, description, category, status: TaskStatus.PLANNED };
        taskService.insertTaskToBoard(boards.currentProject.id, boardId, newTask);
        dispatch(addTaskBoardSuccess(newTask));
    }
}


export const removeTaskFromBoard = (boardId, task) => {
    return async (dispatch, getState) => {
        const { auth, boards } = getState();
        const taskService = auth.firebaseClient.taskService;

        dispatch(boardPending());
        await taskService.removeTaskFromBoard(boards.currentProject.id, boardId, task);
        dispatch(removeTaskBoardSuccess(task.id));
    }
}

export const updateBoardTasks = (boardId, tasks) => {
    return async (dispatch, getState) => {
        const { auth, boards } = getState();
        const taskService = auth.firebaseClient.taskService;

        dispatch(boardPending());
        const updatedTasks = await taskService.updateBoardTasks(boards.currentProject.id, boardId, tasks);
        dispatch(updateBoardTasksSuccess(updatedTasks));
    }
}

export const updateBacklogTasks = (tasks) => {
    return async (dispatch, getState) => {
        const { auth, boards } = getState();
        const taskService = auth.firebaseClient.taskService;

        dispatch(backlogPending());
        const updatedTasks = await taskService.updateBacklogTasks(boards.currentProject.id, tasks);
        dispatch(updateTasksBacklogSuccess(updatedTasks));
    }
}

export const fetchTasksFromProject = async (projectId, taskService) => {
    return await taskService.fetchAllTasksFromProject(projectId);
}

const generateTaskID = () => (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();