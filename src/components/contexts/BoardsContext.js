import React, { useState, useEffect, useContext } from 'react';

import TaskStatus from '../commons/TaskStatus';
import { useProjects } from './ProjectContext';
import { useAuth0 } from '../../auth0-wrapper';


const BoardsContext = React.createContext({});
export const useBoards = () => useContext(BoardsContext);
export const BoardsProvider = ({ children, projectId }) => {

    let [boards, setBoards] = useState([]);
    let [project, setProject] = useState({});

    const { projects, updateProject } = useProjects();
    const { firebaseClient } = useAuth0();

    useEffect(() => {

        const setup = async () => {
            const currentProject = projects.find(element => element.id === projectId);
            setProject({ ...currentProject });

            const projectBoards = await firebaseClient.fetchBoardsByProject(currentProject.id);
            setBoards(projectBoards);
        }

        setup();

    }, []);

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

    const editProject = (title, description, generalInfo) => {
        const newProject = { ...project, title, description, generalInfo };
        setProject(newProject);
        updateProject(newProject);
        // setAlert({ show: true, msg: `${currentProject.title} was succesfully edited.` });
    }

    return (
        <BoardsContext.Provider value={{ project, boards, editProject, addBoard, removeBoard }}>
            {children}
        </BoardsContext.Provider>
    );
}


export const BoardsConsumer = BoardsContext.Consumer;
export default BoardsContext;
