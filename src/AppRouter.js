import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import UserWorkspace from './components/user/UserWorkspace';
import ProjectWorkspace from './components/project/ProjectWorkspace';
import ErrorPage from './components/commons/ErrorPage';

import { categories } from './components/commons/Categories';
import TaskStatus from './components/commons/TaskStatus';
import PageAlert from './components/commons/PageAlert';

let tasks = [
    {
        name: "Prototype the movement system",
        description: "Rules for the movement system can be found here: ",
        category: categories.PROGRAMMING,
        status: TaskStatus.PLANNED
    },
    {
        name: "Prototype the xxx system",
        description: "Rules for the xxx system can be found here: ",
        category: categories.PROGRAMMING,
        status: TaskStatus.IN_PROGRESS
    },
    {
        name: "Prototype the zzzz system",
        description: "Rules for the zzzz system can be found here: ",
        category: categories.PROGRAMMING,
        status: TaskStatus.TESTING
    },
    {
        name: "Do some art",
        description: "References: ",
        category: categories.ART,
        status: TaskStatus.PLANNED
    },
    {
        name: "Update the design log",
        description: "",
        category: categories.DESIGN,
        status: TaskStatus.PLANNED
    },
    {
        name: "Begin the project",
        description: "",
        category: categories.PROGRAMMING,
        status: TaskStatus.COMPLETED
    },
];

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
            members: [author],
            logs: []
        };

        projects.push(newProject);

        setAlert({ show: true, msg: `${title} project was succesfully created.` })
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
            name,
            description,
            category,
            status: TaskStatus.PLANNED
        };

        let project = projects.find(project => project.id == projectId);
        let board = project.boards.find(board => board.title == boardTitle);
        board.tasks.push(newTask);

        setAlert({ show: true, msg: `${name} task was succesfully created.` })
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

    return (
        <BrowserRouter>
            <PageAlert {...alert} onClose={() => setAlert({ show: false, msg: "" })} />

            <Switch>
                <Route exact path="/" component={LoginPage}>
                    <Redirect to="/login" />
                </Route>
                <Route exact path="/login" component={LoginPage} />
                <Route path="/workspace" render={(routeProps) => <UserWorkspace {...routeProps} user={user} addProject={addProject} />} />
                <Route path="/project/:projectId" render={(routeProps) => <ProjectWorkspace {...routeProps} {...{ user, addBoard, addTask, addLog }} />} />
                <Route component={ErrorPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default AppRouter;