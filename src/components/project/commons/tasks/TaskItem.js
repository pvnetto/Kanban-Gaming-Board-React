import React from 'react';

const TaskItem = (props) => {
    return (
        <li>
            <div>
                #{props.index}<p>{props.name}</p>
                <p>{props.description}</p>
            </div>
        </li>
    );
};

export default TaskItem;