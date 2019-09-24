import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { faGamepad, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import SectionNavbar from '../../../commons/SectionNavbar';
import SectionNavbarButton from '../../../commons/SectionNavbarButton';
import BoardSidenav from './BoardSidenav';
import BoardColumn from './BoardColumn';
import { allCategories } from '../../../commons/Categories';

const BoardColumnWrapper = ({ cols, type, tasks }) => {
    return (
        <Col xs={cols}>
            <BoardColumn type={type} tasks={tasks.filter(task => task.status === type)} />
        </Col>
    )
}

const BoardContainer = (props) => {

    let [category, setCategory] = useState(allCategories.ALL);

    const currentBoard = props.boards.find(board => board.title === props.boardId);

    let tasks = [];
    if (currentBoard) {
        tasks = [...currentBoard.tasks];
        tasks = category === allCategories.ALL ? tasks : tasks.filter(task => task.category === category);
    }

    return (
        <>
            <SectionNavbar sectionTitle={props.title} sectionIcon={faGamepad}>
                <SectionNavbarButton btnTitle={"Add Task"} btnIcon={faPlusSquare} />
            </SectionNavbar>
            
            <Row noGutters={true} className="d-flex flex-fill w-100">
                <BoardSidenav onClick={setCategory} activeCategory={category} />

                <Col className="inner-workspace d-flex flex-row align-items-stretch">
                    {
                        React.Children.map(props.children, (status) => <BoardColumnWrapper cols={12 / props.children.length} type={status} tasks={tasks} />)
                    }
                </Col>
            </Row>
        </ >
    );
};

export default BoardContainer;