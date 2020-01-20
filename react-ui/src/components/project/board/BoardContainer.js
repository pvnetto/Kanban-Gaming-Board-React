import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import { Row, Col } from 'react-bootstrap';
import { faGamepad, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import BoardSidenav from './sidenav';
import BoardColumn from './BoardColumn';
import SectionNavbar from '../../layout/section/SectionNavbar';
import SectionNavbarButton from '../../layout/section/SectionNavbarButton';
import TaskCreateForm from '../../layout/forms/TaskCreateForm';
import { allCategories } from '../../utils/types/Categories';
import ModalBase from '../../utils/ModalBase';
import LoadingSpinner from '../../utils/spinners/LoadingSpinner';

import { handleDragEnd } from './task-drag';

export const BoardContainerHeader = ({ title, children }) => {
    let [showCreateTask, setShowCreateTask] = useState(false);
    return (
        <>
            {/* Form used to create a new task */}
            <ModalBase title={"Add Task"} showModal={showCreateTask} handleClose={() => setShowCreateTask(false)} >
                <TaskCreateForm />
            </ModalBase>

            <SectionNavbar title={title} icon={faGamepad}>
                <SectionNavbarButton title={"Add Task"} icon={faPlusSquare} onClick={() => setShowCreateTask(true)} />
                {children}
            </SectionNavbar>
        </>
    );
}

const BoardContainer = ({ tasks, isPending, updateTasks, removeTask, columns, children }) => {

    let [category, setCategory] = useState(allCategories.ALL);

    const dispatch = useDispatch();

    const getFilteredTasks = () => {
        const filtered = Object.keys(tasks).reduce((filteredObj, key) => {
            filteredObj[key] = getFilteredTasksByStatus(key);
            return filteredObj;
        }, {});
        return filtered;
    }

    const getFilteredTasksByStatus = (status) => {
        return tasks[status].filter(task => task.category === category || category === allCategories.ALL);
    }

    const areTasksLoaded = () => {
        return tasks && Object.keys(tasks).length > 0;
    }

    return (
        <>
            {children}
            <DragDropContext onDragEnd={(result) => handleDragEnd(result, tasks, getFilteredTasks(), updateTasks, dispatch)}>
                <Row noGutters={true} className="d-flex flex-fill w-100">

                    <BoardSidenav onClick={setCategory} activeCategory={category} />

                    <Col className="inner-workspace d-flex flex-row align-items-stretch">
                        {areTasksLoaded() && !isPending ?
                            columns.map((status, idx) => (
                                <Col key={idx} xs={12 / columns.length}>
                                    <BoardColumn type={status} tasks={getFilteredTasksByStatus(status)} removeTask={removeTask} category={category} />
                                </Col>
                            )) :
                            <LoadingSpinner size={'sm'} />}
                    </Col>

                </Row>
            </DragDropContext>
        </>
    );
};

BoardContainer.Header = BoardContainerHeader;
BoardContainer.propTypes = {
    tasks: PropTypes.objectOf(PropTypes.array),
    updateTasks: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.node,
}

export default BoardContainer;