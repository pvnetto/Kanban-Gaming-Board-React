import React from 'react';
import "./TaskItem.scss";
import TaskStatus from '../../../commons/TaskStatus';

const columnBorder = (status) => {
    switch (status) {
        case TaskStatus.BACKLOG:
            return 'border-gray border-gray-hover';
        case TaskStatus.PLANNED:
            return 'border-gray border-gray-hover';
        case TaskStatus.IN_PROGRESS:
            return 'border-blue border-blue-hover';
        case TaskStatus.TESTING:
            return 'border-red border-red-hover';
        case TaskStatus.COMPLETED:
            return 'border-green border-green-hover';
        default:
            return 'border-gray border-gray-hover';
    }
}

const TaskItem = (props) => {
    return (
        <div className={`task-hover bg-dark bg-dark-hover border-2 ${columnBorder(props.status)} w-100 p-2 mb-2 disable-select`}>
            <p className="text-sm text-truncate"> <span className="understated">#{props.index}</span> <span className="font-weight-bold">{props.name}</span></p>
            <div className="d-flex flex-row justify-content-between">
                <p className="text-sm text-truncate">{props.description}</p>
                <p className="text-sm understated ml-1">{"(" + props.category + ")"}</p>
            </div>
        </div>
    );
};

export default TaskItem;