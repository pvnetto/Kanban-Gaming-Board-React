import React, { useState, useRef, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskStatus from '../../../commons/TaskStatus';
import "./TaskItem.scss";

const grid = 8;

const getDraggableStyle = (isDragging, draggableStyle) => {
    return {
        userSelect: 'none',
        ...draggableStyle
    }
}

const TaskItem = (props) => {

    return (
        <Draggable key={props.id} draggableId={`${props.id}`} index={props.index}>
            {(provided, snapshot) => (
                <div style={getDraggableStyle(snapshot.isDragging, provided.draggableProps.style)}
                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                    className={`task-hover bg-dark bg-dark-hover border-radius-5 p-3 mb-2 disable-select cursor-pointer`}>

                    <p className="text-truncate"> <span className="understated">#{props.index}</span> <span className="font-weight-bold">{props.name}</span></p>
                    <div className="d-flex flex-row justify-content-between">
                        <p className="text-sm text-truncate">{props.description}</p>
                        <p className="text-sm understated ml-1">{"(" + props.category + ")"}</p>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default TaskItem;