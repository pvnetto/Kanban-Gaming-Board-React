import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Row, Col } from 'react-bootstrap';
import { faGamepad, faPlusSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons';

import SectionNavbar from '../../commons/SectionNavbar';
import SectionNavbarButton from '../../commons/SectionNavbarButton';
import { allCategories } from '../../commons/Categories';
import ModalBase from '../../commons/ModalBase';
import CreateTaskForm from '../sidenav/CreateTaskForm';
import BoardsContext from '../../contexts/BoardsContext';
import BoardSidenav from './BoardSidenav';
import BoardColumn from './BoardColumn';

import TaskStatus from '../../commons/TaskStatus';

const BoardColumnWrapper = ({ cols, type, tasks, updateTask }) => {
    return (
        <Col xs={cols}>
            <BoardColumn type={type} tasks={tasks.filter(task => task.status === type)} updateTask={updateTask} />
        </Col>
    )
}

const BoardContainer = (props) => {

    let [category, setCategory] = useState(allCategories.ALL);
    let [showCreateTask, setShowCreateTask] = useState(false);
    let [board, setBoard] = useState({});
    let [boardTasks, setBoardTasks] = useState([]);

    let { boards, project, tasks } = useContext(BoardsContext);

    let isBacklog = false;

    useEffect(() => {
        const currentBoard = boards.find(board => board.title === props.boardId);

        if (currentBoard) {
            setBoard({ ...currentBoard });
            setBoardTasks([...tasks]);
        }
        else {
            const backlogTasks = tasks.filter(task => task.status == TaskStatus.BACKLOG);
            setBoardTasks([...backlogTasks]);
            isBacklog = true;
        }
    }, [tasks]);

    useEffect(() => {
        const categoryTasks = category === allCategories.ALL ? tasks : tasks.filter(task => task.category === category);
        setBoardTasks([...categoryTasks]);
    }, [tasks, category]);

    const reorder = (list, srcTask, destTask) => {
        const result = Array.from(list);

        let srcTaskIdInList = tasks.findIndex(task => task.id == srcTask.id);
        let destTaskIdInList = tasks.findIndex(task => task.id == destTask.id);

        const [removed] = result.splice(srcTaskIdInList, 1);
        result.splice(destTaskIdInList, 0, removed);

        return result;
    }

    const move = (srcType, destType, srcIdx, destIdx) => {
        let tasksCopy = [...tasks];
        let srcTypeTasks = tasksCopy.filter(task => task.status == srcType);
        let destTypeTasks = tasksCopy.filter(task => task.status == destType);

        // Updating source task type to the same as destination task
        let srcTask = srcTypeTasks[srcIdx];
        let srcTaskIdInList = tasksCopy.findIndex(task => task.id == srcTask.id);
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
            let typeTasks = tasksCopy.filter(task => task.status == destination.droppableId);
            let srcTask = typeTasks[source.index];
            let destTask = typeTasks[destination.index];
            tasksCopy = reorder(tasksCopy, srcTask, destTask);

            setBoardTasks(tasksCopy);
        }

        // If the draggable was dropped on another droppable column, move it
        else {
            tasksCopy = move(source.droppableId, destination.droppableId, source.index, destination.index);

            setBoardTasks(tasksCopy);
        }
    }

    return (
        <>
            <SectionNavbar sectionTitle={props.title} sectionIcon={faGamepad}>
                <SectionNavbarButton btnTitle={"Add Task"} btnIcon={faPlusSquare} onClick={() => setShowCreateTask(true)} />
                {
                    !isBacklog &&
                    <SectionNavbarButton btnTitle={"Close board"} btnIcon={faWindowClose} onClick={() => console.log("Closing board")} />
                }
            </SectionNavbar>
            <ModalBase title={"Add Task"} showModal={showCreateTask} handleClose={() => setShowCreateTask(false)} >
                <CreateTaskForm {...props} projectId={project.id} />
            </ModalBase>
            <DragDropContext onDragEnd={onDragEnd}>
                <Row noGutters={true} className="d-flex flex-fill w-100">
                    <BoardSidenav onClick={setCategory} activeCategory={category} />

                    <Col className="inner-workspace d-flex flex-row align-items-stretch">
                        {
                            React.Children.map(props.children, (status) => <BoardColumnWrapper cols={12 / props.children.length} type={status} tasks={boardTasks} updateTask={props.updateTask} />)
                        }
                    </Col>
                </Row>
            </DragDropContext>
        </>
    );
};

export default BoardContainer;