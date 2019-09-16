import React from 'react';
import TaskItem from './TaskItem';

const columnTypes = {
    BACKLOG: "Backlog",
    PLANNED: "Planned",
    IN_PROGRESS: "In Progress",
    TESTING: "Testing",
    COMPLETED: "Completed"
};

const columnIcon = (type) => {
    switch (type) {
        case columnIcon.BACKLOG:
            return "BL";
        case columnTypes.PLANNED:
            return "P";
        case columnTypes.IN_PROGRESS:
            return "IP";
        case columnTypes.TESTING:
            return "T";
        case columnTypes.COMPLETED:
            return "CP";
        default:
            return "ICON NOT FOUND";
    }
}

Object.freeze(columnTypes);



const BoardColumn = (props) => {
    return (
        <div>
            <i>{columnIcon(props.type)}</i>
            <p>{columnTypes[props.type]}</p>
            <p>{props.tasks.length}</p>
            <ul>
                {props.tasks.map((task, idx) => <TaskItem key={idx} index={idx} {...task} />)}
            </ul>

        </div>
    );
};

exports.columnTypes = columnTypes;
export default BoardColumn;