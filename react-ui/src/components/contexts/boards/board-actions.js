import { SET_CURRENT_PROJECT, FETCH_BOARDS, ADD_BOARD, REMOVE_BOARD, LOADING_BOARD, ERROR_BOARD } from './board-types';

export const setCurrentProject = (project) => {
    return {
        type: SET_CURRENT_PROJECT,
        data: project,
    }
}

export const fetchBoardsSuccess = (boards) => {
    return {
        type: FETCH_BOARDS,
        data: boards,
    }
}

export const addBoardSuccess = (boardData) => {
    return {
        type: ADD_BOARD,
        data: boardData,
    }
}

export const removeBoardSuccess = (boardId) => {
    return {
        type: REMOVE_BOARD,
        data: boardId,
    }
}

export const loadingBoard = () => {
    return {
        type: LOADING_BOARD,
    }
}

export const errorBoard = (error) => {
    return {
        type: ERROR_BOARD,
        error,
    }
}