import React, { useState, useEffect, useContext } from 'react';

import TaskStatus from '../commons/TaskStatus';
import { useProjects } from './ProjectContext';
import { useAuth0 } from '../../auth0-wrapper';


const BoardsContext = React.createContext({});
export const useBoards = () => useContext(BoardsContext);
export const BoardsProvider = ({ children, projectId }) => {

    let [boards, setBoards] = useState([]);
    let [project, setProject] = useState({});

    const { projects } = useProjects();
    const { firebaseClient } = useAuth0();

    useEffect(() => {
        const currentProject = projects.find(element => element.id === projectId);
        setProject({ ...currentProject });

        const setup = async () => {
            const projectBoards = await firebaseClient.fetchBoardsByProject(currentProject.id);
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

        const addedBoard = await firebaseClient.insertBoard(project.id, newBoard);
        setBoards([...boards, addedBoard]);
        // setAlert({ show: true, msg: `${title} board was succesfully created.` });
    }

    // TODO: Also remove all tasks
    const removeBoard = (id) => {
        const boardsCopy = [...boards];
        const boardToRemove = boardsCopy.findIndex(board => board.id === id);
        boardsCopy.splice(boardToRemove, 1);

        setBoards([...boardsCopy]);
    }

    return (
        <BoardsContext.Provider value={{ project, boards, addBoard, removeBoard }}>
            {children}
        </BoardsContext.Provider>
    );
}


export const BoardsConsumer = BoardsContext.Consumer;
export default BoardsContext;
