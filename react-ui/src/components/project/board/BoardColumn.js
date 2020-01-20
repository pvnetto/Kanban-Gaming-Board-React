import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import TaskStatus from '../../utils/types/TaskStatus';
import TaskItem from './tasks/TaskItem';

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

const BoardColumn = ({ tasks, removeTask, type }) => {

    return (

        <div className={`w-100 h-100 d-flex flex-column align-items-center justify-content-start py-4`}>
            <div className={`w-100 px-3 pb-3 border-bottom ${columnBorder(type)}`}>
                <p className="d-flex flex-row align-items-center justify-content-center text-center">
                    <FontAwesomeIcon icon={faDiceD20} className="mr-3" /> {type}
                </p>
            </div>

            <Droppable droppableId={`${type}`}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef}
                        className={`w-100 d-flex flex-column justify-content-start align-items-stretch flex-fill my-3`}>
                        {tasks ? tasks.map((task, idx) => <TaskItem key={task.id} index={idx} task={task} removeTask={removeTask} />) : null}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <div className={`w-100 p-3 border-bottom ${columnBorder(type)}`}></div>
        </div>
    );
};

BoardColumn.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object),
    removeTask: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
};

export default BoardColumn;