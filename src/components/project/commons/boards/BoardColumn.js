import React from 'react';
import TaskItem from '../tasks/TaskItem';
import { columnTypes, columnIcon, columnBorder } from './ColumnTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BoardColumn = (props) => {
    return (
        <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-between py-4">

            <div className={"w-100 px-3 pb-3 border-bottom " + columnBorder(props.type)}>
                <p className="d-flex flex-row align-items-center justify-content-center text-center">
                    <FontAwesomeIcon icon={columnIcon(props.type)} className="mr-3" /> {props.type} {props.tasks.length}
                </p>
            </div>

            <div className="w-100 d-flex flex-column justify-content-start align-items-center flex-fill my-3">
                {props.tasks.map((task, idx) => <TaskItem key={idx} index={idx} {...task} />)}
            </div>

            <div className={"w-100 p-3 border-bottom " + columnBorder(props.type)}></div>
        </div>
    );
};

export default BoardColumn;