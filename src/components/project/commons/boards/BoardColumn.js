import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

import TaskItem from '../tasks/TaskItem';
import TaskStatus from '../../../commons/TaskStatus';

const columnIcon = (status) => {
    switch (status) {
        case TaskStatus.BACKLOG:
            return faDiceD20;
        case TaskStatus.PLANNED:
            return faDiceD20;
        case TaskStatus.IN_PROGRESS:
            return faDiceD20;
        case TaskStatus.TESTING:
            return faDiceD20;
        case TaskStatus.COMPLETED:
            return faDiceD20;
        default:
            return faDiceD20;
    }
};

const columnBorder = (status) => {
    switch (status) {
        case TaskStatus.BACKLOG:
            return 'border-gray';
        case TaskStatus.PLANNED:
            return 'border-gray';
        case TaskStatus.IN_PROGRESS:
            return 'border-blue';
        case TaskStatus.TESTING:
            return 'border-red';
        case TaskStatus.COMPLETED:
            return 'border-green';
        default:
            return 'border-gray';
    }
}

const BoardColumn = (props) => {

    return (
        <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-between py-4">

            <div className={`w-100 px-3 pb-3 border-bottom ${columnBorder(props.type)}`}>
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