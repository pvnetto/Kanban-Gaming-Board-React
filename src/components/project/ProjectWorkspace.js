import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';

import ProjectWorkspaceRoutes from './routes';
import ProjectWorkspaceSidenav from './sidenav';
import NavigationBar from '../commons/NavigationBar';
import ProjectsContext from '../contexts/ProjectContext';
import { BoardsProvider } from '../contexts/BoardsContext';
import { mockBoards, mockTasks } from '../../mock';
import TaskStatus from '../commons/TaskStatus';
import { useAuth0 } from '../../auth0-wrapper';


const ProjectWorkspace = (props) => {
    const { projects, updateProject } = useContext(ProjectsContext);
    let [boards, setBoards] = useState([...mockBoards]);
    let [expandWorkspace, setExpandWorkspace] = useState(true);
    let [project, setProject] = useState({});

    // TODO: Optimize to avoid passing all the text through context, and passing only necessary tasks instead
    let [tasks, setTasks] = useState([...mockTasks]);

    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) {
            props.history.push('/');
        }
    });

    useEffect(() => {
        const projectId = props.match.params.projectId;
        const currentProject = projects.find(element => element.id === parseInt(projectId));
        setProject({ ...currentProject });
    }, []);

    const addBoard = (title, description, startDate, endDate) => {
        let newBoard = {
            title,
            description,
            startDate,
            endDate
        };

        setBoards([...boards, newBoard]);
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

    const toggleExpandWorkspace = () => {
        setExpandWorkspace(!expandWorkspace);
    }

    return (
        <BoardsProvider value={{ project, boards, tasks, editProject, addBoard, removeBoard, addTask, removeTask }}>

            <ProjectWorkspaceSidenav {...props.match} boards={boards} onExpand={toggleExpandWorkspace} />
            <Container fluid={true} className="full-height bg-primary p-0">
                <div className={`workspace ${expandWorkspace ? 'expand' : ''} d-flex flex-column h-100`}>
                    <NavigationBar />
                    <ProjectWorkspaceRoutes {...props.match} {...props} />
                </div>
            </Container>

        </BoardsProvider>
    );
};

export default ProjectWorkspace;