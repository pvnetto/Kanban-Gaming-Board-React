import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';

import SectionNavbar from '../../commons/SectionNavbar';
import { columnTypes } from '../commons/boards/ColumnTypes';
import BoardColumn from '../commons/boards/BoardColumn';
import BoardSidenav from '../commons/boards/BoardSidenav';


const ProjectBacklog = () => {
    return (
        <>
            <SectionNavbar sectionTitle={"Backlog"} sectionIcon={faGamepad} items={[]} />
            <Row noGutters={true} className="d-flex flex-fill w-100">
                <BoardSidenav />

                <Col className="inner-workspace d-flex flex-row align-items-stretch px-4">
                    <BoardColumn type={columnTypes.BACKLOG} tasks={[]} />
                </Col>
            </Row>
        </ >
    );
};

export default ProjectBacklog;