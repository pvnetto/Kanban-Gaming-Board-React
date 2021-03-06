import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

import "./TaskItem.scss";

const getDraggableStyle = (isDragging, draggableStyle) => {
    return {
        userSelect: 'none',
        ...draggableStyle,
        transitionDuration: `0.0001s`,
    }
}

const TaskItem = ({ index, task, removeTask }) => {

    let [showDropdown, setShowDropdown] = useState(false);
    let [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
    const dispatch = useDispatch();

    const enableDropdown = (e) => {
        e.preventDefault();
        setShowDropdown(true);
        setDropdownPos({ top: e.pageY - 10, left: e.pageX - 90 })
    }

    const disableDropdown = () => {
        if (showDropdown) {
            setShowDropdown(false)
        }
    }

    return (
        <Draggable key={task.id} draggableId={`${task.id}`} index={index}>
            {(provided, snapshot) => (
                <div onClick={disableDropdown} onMouseLeave={disableDropdown} onContextMenu={enableDropdown}
                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                    style={getDraggableStyle(snapshot.isDragging, provided.draggableProps.style)}
                    className={`bg-dark bg-dark-hover border-radius-5 p-3 mb-2 disable-select cursor-pointer`}>

                    <p className="text-break"><span className="font-weight-bold">{task.name}</span></p>
                    <div className="d-flex flex-row justify-content-between">
                        <p className="text-sm text-break">{task.description}</p>
                        <p className="text-sm understated ml-1">{"(" + task.category + ")"}</p>
                    </div>

                    <Dropdown.Menu className="position-fixed" style={{ ...dropdownPos }} show={showDropdown}>
                        <Dropdown.Item onClick={disableDropdown} onSelect={() => dispatch(removeTask(task))}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </div>
            )}
        </Draggable>
    );
};

TaskItem.propTypes = {
    index: PropTypes.number.isRequired,
    task: PropTypes.object.isRequired,
    removeTask: PropTypes.func.isRequired,
};

export default TaskItem;