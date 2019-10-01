import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Row, Col } from 'react-bootstrap';
import { faGamepad, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import SectionNavbar from '../../commons/SectionNavbar';
import SectionNavbarButton from '../../commons/SectionNavbarButton';
import { allCategories } from '../../commons/Categories';
import ModalBase from '../../commons/ModalBase';
import CreateTaskForm from '../sidenav/CreateTaskForm';
import BoardsContext from '../../contexts/BoardsContext';
import BoardSidenav from './BoardSidenav';
import BoardColumn from './BoardColumn';

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

const BoardContainer = (props) => {

    let [category, setCategory] = useState(allCategories.ALL);
    let [categoryTasks, setCategoryTasks] = useState([]);

    let { tasks } = useContext(BoardsContext);

    useEffect(() => {
        const filteredTasks = category === allCategories.ALL ? props.tasks : props.tasks.filter(task => task.category === category);
        setCategoryTasks([...filteredTasks]);
    }, [props.tasks, category]);

    const reorder = (list, srcTask, destTask) => {
        const result = Array.from(list);

        let srcTaskIdInList = tasks.findIndex(task => task.id === srcTask.id);
        let destTaskIdInList = tasks.findIndex(task => task.id === destTask.id);

        const [removed] = result.splice(srcTaskIdInList, 1);
        result.splice(destTaskIdInList, 0, removed);

        return result;
    }

    const move = (srcType, destType, srcIdx, destIdx) => {
        let tasksCopy = [...tasks];
        let srcTypeTasks = tasksCopy.filter(task => task.status === srcType);
        let destTypeTasks = tasksCopy.filter(task => task.status === destType);

        // Updating source task type to the same as destination task
        let srcTask = srcTypeTasks[srcIdx];
        let srcTaskIdInList = tasksCopy.findIndex(task => task.id === srcTask.id);
        tasksCopy[srcTaskIdInList].status = destType;

        // Repositioning source task
        let destTask = destTypeTasks[destIdx];
        // If there's a destination a task, the source task takes its place
        if (destTask) {
            tasksCopy = reorder(tasksCopy, srcTask, destTask);
        }

        return tasksCopy;
    }

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // If the draggable was dropped outside of a droppable, don't do anything
        if (!destination) {
            return;
        }

        let tasksCopy = [...tasks];
        // If the draggable was dropped on the same droppable column, reorder the list
        if (source.droppableId === destination.droppableId) {
            let typeTasks = tasksCopy.filter(task => task.status === destination.droppableId);
            let srcTask = typeTasks[source.index];
            let destTask = typeTasks[destination.index];
            tasksCopy = reorder(tasksCopy, srcTask, destTask);

            setCategoryTasks(tasksCopy);
        }

        // If the draggable was dropped on another droppable column, move it
        else {
            tasksCopy = move(source.droppableId, destination.droppableId, source.index, destination.index);

            setCategoryTasks(tasksCopy);
        }
    }

    return (
        <>
            {props.children}
            <DragDropContext onDragEnd={onDragEnd}>
                <Row noGutters={true} className="d-flex flex-fill w-100">
                    <BoardSidenav onClick={setCategory} activeCategory={category} />

                    <Col className="inner-workspace d-flex flex-row align-items-stretch">
                        {
                            props.columns.map((status, idx) => (
                                <Col key={idx} xs={12 / props.columns.length}>
                                    <BoardColumn boardId={props.match.params.boardId}
                                        type={status} 
                                        tasks={categoryTasks.filter(task => task.status === status)} 
                                        updateTask={props.updateTask} />
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