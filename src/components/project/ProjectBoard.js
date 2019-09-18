import React from 'react';
import SectionNavbar from '../commons/SectionNavbar';
import BoardColumn from './BoardColumn';

import { columnTypes } from './ColumnTypes';

import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';
import BoardSidenav from './BoardSidenav';

const ProjectBoard = () => {
    return (

        <>
            <SectionNavbar sectionTitle={"Board"} sectionIcon={faGamepad} items={[]} />
            <Row noGutters={true} className="d-flex flex-fill w-100">
                <BoardSidenav />

                <Col className="inner-workspace d-flex flex-row align-items-stretch">
                    <Col xs={3}>
                        <BoardColumn type={columnTypes.PLANNED} tasks={[]} />
                    </Col>

                    <Col xs={3}>
                        <BoardColumn type={columnTypes.IN_PROGRESS} tasks={[]} />
                    </Col>

                    <Col xs={3}>
                        <BoardColumn type={columnTypes.TESTING} tasks={[]} />
                    </Col>

                    <Col xs={3}>
                        <BoardColumn type={columnTypes.COMPLETED} tasks={[]} />
                    </Col>
                </Col>
            </Row>

        </ >
    );
};

export default ProjectBoard;