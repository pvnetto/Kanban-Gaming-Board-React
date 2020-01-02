import { SET_CURRENT_PROJECT, FETCH_BOARDS, ADD_BOARD, REMOVE_BOARD, LOADING_BOARD, ERROR_BOARD } from './board-types';

export const defaultState = { currentProject: null, boards: [], isLoading: false, error: null };
const boardReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOADING_BOARD:
            return {
                ...state,
                isLoading: true,
            }
        case ERROR_BOARD:
            return {
                ...state,
                error: action.error,
            }
        case SET_CURRENT_PROJECT:
            return {
                ...state,
                currentProject: action.data,
            }
        case FETCH_BOARDS:
            return {
                ...state,
                boards: action.data,
                isLoading: false,
            }
        case ADD_BOARD:
            return {
                ...state,
                boards: [...state.boards, action.data],
                isLoading: false,
            }
        case REMOVE_BOARD: {
            const boardsCopy = [...state.boards];
            const boardToRemove = boardsCopy.findIndex(board => board.id === action.data);
            boardsCopy.splice(boardToRemove, 1);
            return {
                ...state,
                boards: [...boardsCopy],
                isLoading: false,
            }
        }
        default:
            return state
    }
};

export default boardReducer; 