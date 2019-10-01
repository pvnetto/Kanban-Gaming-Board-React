import React, { useState, useEffect, useContext } from 'react';

import { mockBoards, mockTasks } from '../../mock';
import TaskStatus from '../commons/TaskStatus';
import { useProjects } from './ProjectContext';
import { useAuth0 } from '../../auth0-wrapper';


const BoardsContext = React.createContext({});
export const useBoards = () => useContext(BoardsContext);
export const BoardsProvider = ({ children, projectId }) => {

    let [boards, setBoards] = useState([]);
    let [project, setProject] = useState({});
    // TODO: Optimize to avoid passing all the text through context, and passing only necessary tasks instead
    let [tasks, setTasks] = useState([...mockTasks]);

    const { projects, updateProject } = useProjects();
    const { firebaseClient } = useAuth0();

    useEffect(() => {

        const setup = async () => {
            const currentProject = projects.find(element => element.id === projectId);
            setProject({ ...currentProject });

            const projectBoards = await firebaseClient.fetchBoardsByProject(currentProject.id);
            console.log(projectBoards);
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

    const addTask = (board, name, description, category) => {
        let newTask = {
            id: tasks.length,
            name,
            description,
            category,
            status: TaskStatus.PLANNED
        };

        setTasks([...tasks, newTask]);
        // setAlert({ show: true, msg: `${name} task was succesfully created.` });
    }

    const removeTask = (id) => {
        const tasksCopy = [...tasks];
        const taskToRemove = tasksCopy.findIndex(task => task.id === id);
        tasksCopy.splice(taskToRemove, 1);

        setTasks([...tasksCopy]);
    }

    const editProject = (title, description, generalInfo) => {
        const newProject = { ...project, title, description, generalInfo };
        setProject(newProject);
        updateProject(newProject);
        // setAlert({ show: true, msg: `${currentProject.title} was succesfully edited.` });
    }

    return (
        <BoardsContext.Provider value={{ project, boards, tasks, editProject, addBoard, removeBoard, addTask, removeTask }}>
            {children}
        </BoardsContext.Provider>
    );
}


export const BoardsConsumer = BoardsContext.Consumer;
export default BoardsContext;
