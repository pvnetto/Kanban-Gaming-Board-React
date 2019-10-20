import React, { useState, useEffect, useContext } from 'react';
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
import { useTasks } from '../../contexts/TasksContext';

export const BoardContainerHeader = ({ title, children }) => {
    let [showCreateTask, setShowCreateTask] = useState(false);
    return (
        <>
            <SectionNavbar sectionTitle={title} sectionIcon={faGamepad}>
                <SectionNavbarButton btnTitle={"Add Task"} btnIcon={faPlusSquare} onClick={() => setShowCreateTask(true)} />
                {children}
            </SectionNavbar>
            <ModalBase title={"Add Task"} showModal={showCreateTask} handleClose={() => setShowCreateTask(false)} >
                <CreateTaskForm />
            </ModalBase>
        </>
    );
}

const BoardContainer = ({ tasks, match, columns, children }) => {

    let [category, setCategory] = useState(allCategories.ALL);

    let { updateBoardTasks } = useTasks();

    const reorder = (list, srcIndex, destIndex) => {
        const result = Array.from(list);

        const [removed] = result.splice(srcIndex, 1);
        result.splice(destIndex, 0, removed);

        return result;
    }

    // Source Index = index of task considering the entire list
    // Dest Index = Index of task local to the list
    const move = (destType, srcIdx, destIdx) => {
        let updatedTasks = [...tasks];

        // Updating source task type to the same as destination task
        updatedTasks[srcIdx].status = destType;

        // Dest Index is given relative to the Destination list, so first we find the actual task in the list of destination type tasks
        let destTypeTasks = updatedTasks.filter(task => task.status === destType);
        let destTask = destTypeTasks[destIdx];
        if (destTask) {
            // After finding the destination task, we get its index in the list of all tasks, to reorder correctly
            let destIndexInTasks = tasks.findIndex(task => task === destTask);
            updatedTasks = reorder(updatedTasks, srcIdx, destIndexInTasks);
        }

        return updatedTasks;
    }

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        console.log(result);

        // If the draggable was dropped outside of a droppable, don't do anything
        if (!destination) {
            return;
        }

        let newTasks = [...tasks];

        // If the draggable was dropped on the same droppable column, reorder the list
        if (source.droppableId === destination.droppableId) {
            newTasks = reorder(newTasks, source.index, destination.index);
        }

        // If the draggable was dropped on a different droppable column from its source, move it
        else {
            newTasks = move(destination.droppableId, source.index, destination.index);
        }

        updateBoardTasks(match.params.boardId, newTasks);
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
                                        boardId={match.params.boardId}
                                        type={status}
                                        tasks={tasks}
                                        category={category} />
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