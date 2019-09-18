import React from 'react';
import { columnTypes } from './ColumnTypes';
import SectionNavbar from '../commons/SectionNavbar';
import BoardColumn from './BoardColumn';

import { Row, Col } from 'react-bootstrap';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import BoardSidenav from './BoardSidenav';

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