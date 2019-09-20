import React from 'react';
import "./TaskItem.scss";

const TaskItem = (props) => {
    console.log(props.name);
    return (
        <div className="task-hover bg-dark border-2 border-gray border-gray-hover w-100 p-2 mb-2 disable-select">
            <p className="text-sm text-truncate"> <span className="understated">#{props.index}</span> <span className="font-weight-bold">{props.name}</span></p>
            <div className="d-flex flex-row justify-content-between">
                <p className="text-sm text-truncate">{props.description}</p>
                <p className="text-sm understated ml-1">{"(" + props.category + ")"}</p>
            </div>
        </div>
    );
};

export default TaskItem;