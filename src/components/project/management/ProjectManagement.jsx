import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { faEdit, faUsers, faDiceD20 } from '@fortawesome/free-solid-svg-icons';

import SectionContainer from '../../commons/SectionContainer';
import ProjectEditForm from './ProjectEditForm';
import ProjectInviteForm from './ProjectInviteForm';
import ProjectDeleteForm from './ProjectDeleteForm';

const ProjectManagement = () => {

    return (
        <Row className="p-2" noGutters={true}>
            <Col xs={12} lg={6} className="pr-2">
                <SectionContainer title={"Edit Project"} titleIcon={faEdit}>
                    <ProjectEditForm />
                </SectionContainer>
            </Col>

            <Col xs={12} lg={6}>
                <SectionContainer title={"Manage Project Members"} titleIcon={faUsers}>
                    <ProjectInviteForm />
                </SectionContainer>

                <SectionContainer title={"Manage Project"} titleIcon={faDiceD20}>
                    <ProjectDeleteForm />
                </SectionContainer>
            </Col>
        </Row>
    );
};

export default ProjectManagement;