import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Draggable } from 'react-beautiful-dnd';

import "./TaskItem.scss";

const getDraggableStyle = (isDragging, draggableStyle) => {
    return {
        userSelect: 'none',
        ...draggableStyle
    }
}

const TaskItem = ({ index, task, removeTask }) => {

    let [showDropdown, setShowDropdown] = useState(false);
    let [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

    const enableDropdown = (e) => {
        e.preventDefault();
        setShowDropdown(true);
        setDropdownPos({ top: e.pageY - 10, left: e.pageX - 90 })
    }

    const disableDropdown = (e) => {
        if (showDropdown) {
            setShowDropdown(false)
        }
    }

    return (
        <Draggable key={index} draggableId={`${index}`} index={index}>
            {(provided, snapshot) => (
                <div onClick={disableDropdown} onMouseLeave={disableDropdown} onContextMenu={enableDropdown}
                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                    style={getDraggableStyle(snapshot.isDragging, provided.draggableProps.style)}
                    className={`task-hover bg-dark bg-dark-hover border-radius-5 p-3 mb-2 disable-select cursor-pointer`}>

                    <p className="text-break"><span className="font-weight-bold">{task.name}</span></p>
                    <div className="d-flex flex-row justify-content-between">
                        <p className="text-sm text-break">{task.description}</p>
                        <p className="text-sm understated ml-1">{"(" + task.category + ")"}</p>
                    </div>

                    <Dropdown.Menu className="position-fixed" style={{ ...dropdownPos }} show={showDropdown}>
                        <Dropdown.Item onClick={disableDropdown} onSelect={() => console.log("editing")}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={disableDropdown} onSelect={() => removeTask(task)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </div>
            )}
        </Draggable>
    );
};

export default TaskItem;