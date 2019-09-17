import React from 'react';
import { columnTypes } from './ColumnTypes';
import SectionNavbar from '../commons/SectionNavbar';
import SectionSidenav from '../commons/SectionSidenav';
import SidenavButton from '../commons/SidenavButton';
import BoardColumn from './BoardColumn';
import { Row, Col } from 'react-bootstrap';

const sidenavBtns = [
    <SidenavButton btnTitle={"ALL ITEMS"} btnIcon={"A"} />,
    <SidenavButton btnTitle={"PROGRAMMING"} btnIcon={"P"} />,
    <SidenavButton btnTitle={"ART"} btnIcon={"AR"} />,
    <SidenavButton btnTitle={"DESIGN"} btnIcon={"D"} />,
    <SidenavButton btnTitle={"WRITING"} btnIcon={"W"} />,
    <SidenavButton btnTitle={"MARKETING"} btnIcon={"M"} />,
    <SidenavButton btnTitle={"SOUND"} btnIcon={"S"} />,
    <SidenavButton btnTitle={"BUGS"} btnIcon={"B"} />
];

const ProjectBacklog = () => {
    return (
        <Row>
            <Col xs={12}>
                <SectionNavbar sectionTitle={"My Dashboard"} sectionIcon={"DS"} options={[]} />
                <SectionSidenav buttons={sidenavBtns} />

                <div className="col">
                    <div className="col-12">
                        <BoardColumn type={columnTypes.BACKLOG} tasks={[]} />
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default ProjectBacklog;