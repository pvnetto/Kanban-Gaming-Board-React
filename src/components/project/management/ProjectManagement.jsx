import React from 'react';
import { Row, Col } from 'react-bootstrap';

import SectionContainer from '../../commons/SectionContainer';
import ProjectEditForm from './ProjectEditForm';
import ProjectInviteForm from './ProjectInviteForm';
import ProjectDeleteForm from './ProjectDeleteForm';

const ProjectManagement = () => {

    return (
        <Row className="p-2" noGutters={true}>
            <Col xs={12} lg={6} className="pr-2">
                <SectionContainer title={"Edit Project"} titleIcon={"EPR"} items={[<ProjectEditForm />]} />
            </Col>

            <Col xs={12} lg={6}>
                <SectionContainer title={"Manage Project Members"} titleIcon={"MGMT"} items={[<ProjectInviteForm />]} />
                <SectionContainer title={"Manage Project"} titleIcon={"MGMT"} items={[<ProjectDeleteForm />]} />
            </Col>
        </Row>
    );
};

export default ProjectManagement;