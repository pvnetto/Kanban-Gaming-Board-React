import React from 'react';
import SectionContainer from '../commons/SectionContainer';
import ProjectItem from '../project/ProjectItem';

import { Row, Col } from 'react-bootstrap'
import { faDiceD20 } from '../../../node_modules/@fortawesome/free-solid-svg-icons';

const UserManagement = () => {
    const projectItems = [
        <ProjectItem />
    ];

    return (

        <Row noGutters={true}>
            <Col className="w-100 p-2" xs={4}>
                <SectionContainer title={"Your Projects"} titleIcon={faDiceD20} items={projectItems} />
            </Col>
        </Row>
    );
};

export default UserManagement;