import React, { useState } from 'react';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';

import SectionNavbar from '../../commons/SectionNavbar';
import BoardColumn from '../commons/boards/BoardColumn';
import BoardSidenav from '../commons/boards/BoardSidenav';
import TaskStatus from '../../commons/TaskStatus';
import categories from '../../commons/Categories';

let allCategories = {};
allCategories = Object.assign(allCategories, categories);
allCategories.ALL = "All Items";

const ProjectBoard = (props) => {

    let [category, setCategory] = useState(allCategories.ALL);

    const boardId = props.match.params.boardId;
    const currentBoard = props.boards.find(board => board.title === boardId);


    let tasks = [...currentBoard.tasks];
    tasks = category === allCategories.ALL ? tasks : tasks.filter(task => task.category === category);

    return (

        <>
            <SectionNavbar sectionTitle={"Board"} sectionIcon={faGamepad} items={[]} />
            <Row noGutters={true} className="d-flex flex-fill w-100">
                <BoardSidenav categories={allCategories} onClick={setCategory} activeCategory={category} />

                <Col className="inner-workspace d-flex flex-row align-items-stretch">
                    <Col xs={3}>
                        <BoardColumn type={TaskStatus.PLANNED} tasks={tasks.filter(task => task.status === TaskStatus.PLANNED)} />
                    </Col>

                    <Col xs={3}>
                        <BoardColumn type={TaskStatus.IN_PROGRESS} tasks={tasks.filter(task => task.status === TaskStatus.IN_PROGRESS)} />
                    </Col>

                    <Col xs={3}>
                        <BoardColumn type={TaskStatus.TESTING} tasks={tasks.filter(task => task.status === TaskStatus.TESTING)} />
                    </Col>

                    <Col xs={3}>
                        <BoardColumn type={TaskStatus.COMPLETED} tasks={tasks.filter(task => task.status === TaskStatus.COMPLETED)} />
                    </Col>
                </Col>
            </Row>

        </ >
    );
};

export default ProjectBoard;