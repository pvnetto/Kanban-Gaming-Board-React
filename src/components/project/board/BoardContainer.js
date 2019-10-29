import React, { useState, useEffect } from 'react';
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
    let [filteredTasks, setFilteredTasks] = useState({});

    useEffect(() => {
        let filtered = {};
        Object.keys(tasks).forEach(key => {
            filtered[key] = tasks[key].filter(task => task.category === category || category === allCategories.ALL)
        });

        setFilteredTasks(filtered);
    }, [category, tasks]);

    const filteredToRegularIndex = (idx, type) => {
        const regularIdx = tasks[type].findIndex(task => task.id === filteredTasks[type][idx]);
        return regularIdx != -1 ? regularIdx : idx;
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    const move = (source, destination, droppableSource, droppableDestination, sourceIdx, destinationIdx) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(sourceIdx, 1);

        removed.status = droppableDestination.droppableId;

        destClone.splice(destinationIdx, 0, removed);

        const result = {};
        result[droppableSource.droppableId] = sourceClone;
        result[droppableDestination.droppableId] = destClone;

        return result;
    };

    const handleDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        const newTasks = Object.assign({}, tasks);
        const sourceIdx = filteredToRegularIndex(source.index, source.droppableId);
        const destinationIdx = filteredToRegularIndex(destination.index, destination.droppableId);

        if (source.droppableId === destination.droppableId) {
            const reorderedItems = reorder(newTasks[source.droppableId], sourceIdx, destinationIdx);
            newTasks[source.droppableId] = reorderedItems;
        }
        else {
            const movedTasks = move(newTasks[source.droppableId], newTasks[destination.droppableId], source, destination, sourceIdx, destinationIdx);
            newTasks[source.droppableId] = movedTasks[source.droppableId];
            newTasks[destination.droppableId] = movedTasks[destination.droppableId];
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
                                        tasks={filteredTasks[status]}
                                        removeTask={removeTask}
                                        category={category}
                                    />
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