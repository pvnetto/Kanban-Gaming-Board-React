import React from 'react';
import { Row, Col } from 'react-bootstrap';

import SectionContainer from '../../commons/SectionContainer';
import ProjectEditForm from './ProjectEditForm';
import ProjectInviteForm from './ProjectInviteForm';
import ProjectDeleteForm from './ProjectDeleteForm';

const ProjectManagement = ({ project }) => {

    return (
        <Row className="p-2" noGutters={true}>
            <Col xs={12} lg={6} className="pr-2">
                <SectionContainer title={"Edit Project"} titleIcon={"EPR"}>
                    <ProjectEditForm />
                </SectionContainer>
            </Col>

            <Col xs={12} lg={6}>
                <SectionContainer title={"Manage Project Members"} titleIcon={"MGMT"}>
                    <ProjectInviteForm />
                </SectionContainer>

                <SectionContainer title={"Manage Project"} titleIcon={"MGMT"}>
                    <ProjectDeleteForm />
                </SectionContainer>
            </Col>
        </Row>
    );
};

export default ProjectManagement;