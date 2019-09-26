import { categories } from './components/commons/Categories';
import TaskStatus from './components/commons/TaskStatus';

export let mockTasks = [
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
    {
        id: 6,
        name: "First backlog task",
        description: "",
        category: categories.PROGRAMMING,
        status: TaskStatus.BACKLOG
    },
    {
        id: 7,
        name: "Another backlog task",
        description: "",
        category: categories.ART,
        status: TaskStatus.BACKLOG
    },
    {
        id: 8,
        name: "And another one",
        description: "",
        category: categories.DESIGN,
        status: TaskStatus.BACKLOG
    },
];

export let mockBoards = [
    {
        title: "My First Board",
        description: "This board refers to the first sprint of the application",
        // tasks: mockTasks,
        startDate: new Date(),
        endDate: new Date()
    }
];

export let mockLogs = [
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

export let members = [
    {
        name: "Member 1",
        email: "member1@gmail.com"
    },
    {
        name: "Yet another member",
        email: "yetanother@gmail.com"
    }
]

export let projects = [
    {
        id: 0,
        title: "Car Simulation Project",
        description: "This is a car simulation project for study purposes only",
        generalInfo: "This project was motivated by a need to understand more about how physics for game development works",
        // boards: boards,
        // backlog: backlogTasks,
        // members: members,
        // logs: logs
    }
];