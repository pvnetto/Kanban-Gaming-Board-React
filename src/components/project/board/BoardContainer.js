import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Row, Col } from 'react-bootstrap';
import { faGamepad, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import SectionNavbar from '../../commons/SectionNavbar';
import SectionNavbarButton from '../../commons/SectionNavbarButton';
import { allCategories } from '../../commons/Categories';
import ModalBase from '../../commons/ModalBase';
import CreateTaskForm from '../sidenav/CreateTaskForm';
import BoardSidenav from './BoardSidenav';
import BoardColumn from './BoardColumn';

export const BoardContainerHeader = ({ title, addTaskToBoard, addTaskToBacklog, children }) => {
    let [showCreateTask, setShowCreateTask] = useState(false);
    return (
        <>
            {/* Form used to create a new task */}
            <ModalBase title={"Add Task"} showModal={showCreateTask} handleClose={() => setShowCreateTask(false)} >
                <CreateTaskForm {...{ addTaskToBoard, addTaskToBacklog }} />
            </ModalBase>

            <SectionNavbar sectionTitle={title} sectionIcon={faGamepad}>
                <SectionNavbarButton btnTitle={"Add Task"} btnIcon={faPlusSquare} onClick={() => setShowCreateTask(true)} />
                {children}
            </SectionNavbar>
        </>
    );
}

const BoardContainer = ({ tasks, updateTasks, removeTask, columns, children }) => {

    let [category, setCategory] = useState(allCategories.ALL);

    const isTaskValid = (task, type, category) => {
        return task.status === type && (category === allCategories.ALL || task.category === category);
    }

    const reorder = (list, srcIndex, destIndex, destType) => {
        const result = Array.from(list);

        // Dest Index is given relative to the Destination list, so first we find the actual task in the list of destination type tasks
        let destTypeTasks = result.filter(task => isTaskValid(task, destType, category));
        let destTask = destTypeTasks[destIndex];
        let destIndexInTasks = tasks.findIndex(task => task === destTask);

        const [removed] = result.splice(srcIndex, 1);
        result.splice(destIndexInTasks, 0, removed);

        return result;
    }

    // Source Index = index of task considering the entire list
    // Dest Index = Index of task local to the rendered list
    const move = (destType, srcIdx, destIdx) => {
        let updatedTasks = [...tasks];

        // Updating source task type to the same as destination task
        updatedTasks[srcIdx].status = destType;

        // Reordering tasks
        updatedTasks = reorder(updatedTasks, srcIdx, destIdx, destType);

        return updatedTasks;
    }

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        // If the draggable was dropped outside of a droppable, don't do anything
        if (!destination) {
            return;
        }

        // If the draggable was dropped on the same droppable column, reorder the list
        // Else, the draggable was dropped on a different droppable column from its source, move it
        let newTasks = [...tasks];
        if (source.droppableId === destination.droppableId) {
            newTasks = reorder(newTasks, source.index, destination.index, destination.droppableId);
        }
        else {
            newTasks = move(destination.droppableId, source.index, destination.index);
        }

        updateTasks(newTasks);
    }

    return (
        <>
            {children}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Row noGutters={true} className="d-flex flex-fill w-100">
                    <BoardSidenav onClick={setCategory} activeCategory={category} />

                    <Col className="inner-workspace d-flex flex-row align-items-stretch">
                        {
                            columns.map((status, idx) => (
                                <Col key={idx} xs={12 / columns.length}>
                                    <BoardColumn
                                        type={status}
                                        tasks={tasks}
                                        removeTask={removeTask}
                                        category={category}
                                        isTaskValid={isTaskValid} />
                                </Col>
                            ))
                        }
                    </Col>
                </Row>
            </DragDropContext>
        </>
    );
};

BoardContainer.Header = BoardContainerHeader;

export default BoardContainer;