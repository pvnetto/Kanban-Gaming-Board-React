import React from 'react';
import { useSelector } from 'react-redux';

import SectionContainer from '../../layout/section/SectionContainer';
import ProjectItem from '../../utils/ProjectItem';

import { Row, Col } from 'react-bootstrap'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

const PersonalManagement = () => {
    const projects = useSelector(state => state.projects.projects);
    const projectItems = projects.map((project, idx) => <ProjectItem key={idx} {...project} redirect={'/management'} />);

    return (

        <Row noGutters={true}>
            <Col className="w-100 p-2" xl={4} md={6} xs={12}>
                <SectionContainer title={"Your Projects"} icon={faDiceD20}>
                    {projectItems.length > 0 ?
                        projectItems :
                        <p className="text-center">You don't have any project to manage.</p>}
                </ SectionContainer>
            </Col>
        </Row>
    );
};

export default PersonalManagement;