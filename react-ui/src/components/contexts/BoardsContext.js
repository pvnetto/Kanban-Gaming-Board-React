import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';

import { useAuth0 } from '../../auth0-wrapper';


const BoardsContext = React.createContext({});
export const useBoards = () => useContext(BoardsContext);
export const BoardsProvider = ({ children, projectId }) => {

    let [boards, setBoards] = useState([]);
    let [project, setProject] = useState(null);

    const projects = useSelector(state => state.projects);
    const { firebaseClient } = useAuth0();

    useEffect(() => {
        console.log(projectId);
        const currentProject = projects.find(element => element.id === projectId);
        setProject({ ...currentProject });

        const setup = async () => {
            const projectBoards = await firebaseClient.boardService.fetchBoardsByProject(currentProject.id);
            setBoards(projectBoards);
        }

        setup();
    }, []);

    useEffect(() => {
        const currentProject = projects.find(element => element.id === projectId);
        setProject({ ...currentProject });
    }, [projects])

    const addBoard = async (title, description, startDate, endDate) => {
        const newBoard = {
            title,
            description,
            startDate: startDate.toDate(),
            endDate: endDate.toDate()
        }

        const addedBoard = await firebaseClient.boardService.insertBoard(project.id, newBoard);
        setBoards([...boards, addedBoard]);
    }

    const removeBoard = async (boardId) => {
        await firebaseClient.boardService.removeBoard(project.id, boardId);

        const boardsCopy = [...boards];
        const boardToRemove = boardsCopy.findIndex(board => board.id === boardId);
        boardsCopy.splice(boardToRemove, 1);

        setBoards([...boardsCopy]);
    }

    return (
        <BoardsContext.Provider value={{ project, boards, addBoard, removeBoard }}>
            {project ? children : null}
        </BoardsContext.Provider>
    );
}


export const BoardsConsumer = BoardsContext.Consumer;
export default BoardsContext;
