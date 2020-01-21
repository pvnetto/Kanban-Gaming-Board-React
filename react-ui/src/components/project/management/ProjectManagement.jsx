import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { faEdit, faUsers, faDiceD20 } from '@fortawesome/free-solid-svg-icons';

import SectionContainer from '../../layout/section/SectionContainer';
import ProjectEditForm from '../../layout/forms/ProjectEditForm';
import ProjectInviteForm from '../../layout/forms//ProjectInviteForm';
import ProjectDeleteForm from '../../layout/forms//ProjectDeleteForm';

const ProjectManagement = () => {

    return (
        <Row className="p-2" noGutters={true}>
            <Col xs={12} lg={6} className="pr-lg-2 pr-0">
                <SectionContainer title={"Edit Project"} icon={faEdit}>
                    <ProjectEditForm />
                </SectionContainer>
            </Col>

            <Col xs={12} lg={6}>
                <SectionContainer title={"Manage Project Members"} icon={faUsers}>
                    <ProjectInviteForm />
                </SectionContainer>

                <SectionContainer title={"Manage Project"} icon={faDiceD20}>
                    <ProjectDeleteForm />
                </SectionContainer>
            </Col>
        </Row>
    );
};

export default ProjectManagement;