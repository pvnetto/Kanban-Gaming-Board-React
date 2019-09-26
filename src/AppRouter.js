import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import UserWorkspace from './components/user/UserWorkspace';
import ProjectWorkspace from './components/project/ProjectWorkspace';
import ErrorPage from './components/commons/ErrorPage';

import { categories } from './components/commons/Categories';
import TaskStatus from './components/commons/TaskStatus';
import PageAlert from './components/commons/PageAlert';

import { DragDropContext } from 'react-beautiful-dnd';

let tasks = [
    {
        id: 0,
        name: "Prototype the movement system",
        description: "Rules for the movement system can be found here: ",
        category: categories.PROGRAMMING,
        status: TaskStatus.PLANNED,
    },
    {
        id: 1,
        name: "Prototype the xxx system",
        description: "Rules for the xxx system can be found here: ",
        category: categories.PROGRAMMING,
        status: TaskStatus.IN_PROGRESS
    },
    {
        id: 2,
        name: "Prototype the zzzz system",
        description: "Rules for the zzzz system can be found here: ",
        category: categories.PROGRAMMING,
        status: TaskStatus.TESTING
    },
    {
        id: 3,
        name: "Do some art",
        description: "References: ",
        category: categories.ART,
        status: TaskStatus.PLANNED
    },
    {
        id: 4,
        name: "Update the design log",
        description: "",
        category: categories.DESIGN,
        status: TaskStatus.PLANNED
    },
    {
        id: 5,
        name: "Begin the project",
        description: "",
        category: categories.PROGRAMMING,
        status: TaskStatus.COMPLETED
    },
];

let backlogTasks = [];

let boards = [
    {
        title: "My First Board",
        description: "This board refers to the first sprint of the application",
        tasks: tasks,
        startDate: new Date(),
        endDate: new Date()
    }
];

let logs = [
    {
        id: 0,
        title: "Why it would be nice to change everything",
        content: "The reason we should everything is because I want to change everything",
        date: new Date(),
        author: "Member 1"
    },
    {
        id: 1,
        title: "I don't think we should change everything anymore",
        content: "Yes, I'm sorry....",
        date: new Date(),
        author: "Member 1"
    }
];

let members = [
    {
        name: "Member 1",
        email: "member1@gmail.com"
    },
    {
        name: "Yet another member",
        email: "yetanother@gmail.com"
    }
]

let projects = [
    {
        id: 0,
        title: "Car Simulation Project",
        description: "This is a car simulation project for study purposes only",
        generalInfo: "This project was motivated by a need to understand more about how physics for game development works",
        boards: boards,
        backlog: backlogTasks,
        members: members,
        logs: logs
    }
];

const user = {
    name: "Paivaaaa",
    email: "pvnetto1@gmail.com",
    avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    projects: projects
};

const AppRouter = () => {

    let [alert, setAlert] = useState({ show: false, msg: "" });

    const addProject = (title, description, generalInfo, author) => {
        let id = projects.length;

        const newProject = {
            id,
            title,
            description,
            generalInfo,
            boards: [],
            backlog: [],
            members: [author],
            logs: []
        };

        projects.push(newProject);

        setAlert({ show: true, msg: `${title} project was succesfully created.` })
    }

    const editProject = (projectId, title, description, generalInfo) => {
        let currentProject = projects.find(project => project.id == projectId);
        currentProject.title = title;
        currentProject.description = description;
        currentProject.generalInfo = generalInfo;

        setAlert({ show: true, msg: `${currentProject.title} was succesfully edited.` });
    }

    const addBoard = (projectId, title, description, startDate, endDate) => {
        let newBoard = {
            title,
            description,
            tasks: [],
            startDate,
            endDate
        }

        let project = projects.find(project => project.id == projectId);
        project.boards.push(newBoard);

        setAlert({ show: true, msg: `${title} board was succesfully created.` })
    }

    const addTask = (projectId, boardTitle, name, description, category) => {
        let newTask = {
            id: tasks.length,
            name,
            description,
            category,
            status: TaskStatus.PLANNED
        };

        let project = projects.find(project => project.id == projectId);
        if (boardTitle == "") {
            newTask.status = TaskStatus.BACKLOG;
            project.backlog.push(newTask);
        }
        else {
            let board = project.boards.find(board => board.title == boardTitle);
            board.tasks.push(newTask);
        }

        setAlert({ show: true, msg: `${name} task was succesfully created.` })
    }

    const updateTask = (taskID, status) => {
        let newTask = tasks.find(task => task.id == taskID);
        newTask.status = status;

        // tasks.push(newTask);

        console.log(newTask);
        setAlert({ show: true, msg: `Task updated.` })
    }

    const addLog = (projectId, title, content) => {
        let newLog = {
            id: logs.length,
            title,
            content,
            date: new Date(),
            author: user.name
        };

        let project = projects.find(project => project.id == projectId);
        project.logs.push(newLog);

        setAlert({ show: true, msg: `Log #${newLog.id} was added.` })
    }

    const reorder = (list, srcTask, destTask) => {
        const result = Array.from(list);

        let srcTaskIdInList = tasks.findIndex(task => task.id == srcTask.id);
        let destTaskIdInList = tasks.findIndex(task => task.id == destTask.id);

        const [removed] = result.splice(srcTaskIdInList, 1);
        result.splice(destTaskIdInList, 0, removed);

        return result;
    }

    const move = (srcType, destType, srcIdx, destIdx) => {
        let srcTypeTasks = tasks.filter(task => task.status == srcType);
        let destTypeTasks = tasks.filter(task => task.status == destType);

        // Updating source task type to the same as destination task
        let srcTask = srcTypeTasks[srcIdx];
        let srcTaskIdInList = tasks.findIndex(task => task.id == srcTask.id);
        tasks[srcTaskIdInList].status = destType;

        // Repositioning source task
        let destTask = destTypeTasks[destIdx];
        // If there's a destination a task, the source task takes its place
        if (destTask) {
            tasks = reorder(tasks, srcTask, destTask);
        }

        return tasks;
    }

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // If the draggable was dropped outside of a droppable, don't do anything
        if (!destination) {
            return;
        }

        // If the draggable was dropped on the same droppable column, reorder the list
        if (source.droppableId === destination.droppableId) {
            let typeTasks = tasks.filter(task => task.status == destination.droppableId);
            let srcTask = typeTasks[source.index];
            let destTask = typeTasks[destination.index];
            tasks = reorder(tasks, srcTask, destTask);

            user.projects[0].boards[0].tasks = tasks;
        }

        // If the draggable was dropped on another droppable column, move it
        else {
            tasks = move(source.droppableId, destination.droppableId, source.index, destination.index);
            user.projects[0].boards[0].tasks = tasks;
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <BrowserRouter>
                <PageAlert {...alert} onClose={() => setAlert({ show: false, msg: "" })} />

                <Switch>
                    <Route exact path="/" component={LoginPage}>
                        <Redirect to="/login" />
                    </Route>
                    <Route exact path="/login" component={LoginPage} />
                    <Route path="/workspace" render={(routeProps) => <UserWorkspace {...routeProps} user={user} addProject={addProject} />} />
                    <Route path="/project/:projectId" render={(routeProps) => <ProjectWorkspace {...routeProps} {...{ user, addBoard, addTask, updateTask, addLog, editProject }} />} />
                    <Route component={ErrorPage} />
                </Switch>
            </BrowserRouter>
        </DragDropContext>
    );
};

export default AppRouter;