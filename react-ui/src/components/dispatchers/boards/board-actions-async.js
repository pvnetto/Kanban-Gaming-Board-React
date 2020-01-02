import { loadingBoard, setCurrentProject, fetchBoardsSuccess, addBoardSuccess, removeBoardSuccess } from './board-actions';

export const loadProject = (projectId) => {
    return async (dispatch, getState) => {
        const { auth, projects } = getState();
        const boardService = auth.firebaseClient.boardService;

        const currentProject = projects.projects.find(project => project.id == projectId);
        dispatch(setCurrentProject(currentProject));
        dispatch(fetchBoardsAction(boardService));
    }
}

export const fetchBoardsAction = () => {
    return async (dispatch, getState) => {
        const { auth, boards } = getState();
        const boardService = auth.firebaseClient.boardService;

        if (boards.currentProject) {
            dispatch(loadingBoard());
            const projectBoards = await boardService.fetchBoardsByProject(boards.currentProject.id);
            dispatch(fetchBoardsSuccess(projectBoards));
        }
    }
}

export const addBoardAction = (title, description, startDate, endDate) => {
    return async (dispatch, getState) => {
        const { auth } = getState();
        const boardService = auth.firebaseClient.boardService;

        dispatch(loadingBoard());
        const newBoard = { title, description, startDate: startDate.toDate(), endDate: endDate.toDate() }
        const state = getState();
        const addedBoard = await boardService.insertBoard(state.boards.currentProject.id, newBoard);
        dispatch(addBoardSuccess(addedBoard));
    }
}

export const removeBoardAction = (boardId) => {
    return async (dispatch, getState) => {
        const { auth } = getState();
        const boardService = auth.firebaseClient.boardService;

        dispatch(loadingBoard());
        const state = getState();
        await boardService.removeBoard(state.boards.currentProject.id, boardId);
        dispatch(removeBoardSuccess(boardId));
    }
}