import React from 'react';
import TaskItem from './TaskItem';
import { columnTypes, columnIcon } from './ColumnTypes';

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

export default BoardColumn;