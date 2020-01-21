import React from 'react';
import { useSelector } from 'react-redux';

import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faChartPie, faDiceD20, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import SectionNavbar from '../../layout/section/SectionNavbar';
import SectionContainer from '../../layout/section/SectionContainer';
import ProjectMetrics from './metrics/ProjectMetrics';

const ProjectDescSection = ({ title, description }) => {
    return (
        <div className="p-4 mb-2 bg-dark border-2 border-radius-5 border-light d-flex flex-column justify-content-center align-items-center">
            <FontAwesomeIcon className="icon-xl" icon={faDiceD20} />
            <h1 className="font-weight-bold mt-3">{title}</h1>
            <p>{description}</p>
        </div>
    );
}

const ProjectDashboard = () => {
    const currentProject = useSelector(state => state.boards.currentProject);

    if (!currentProject) return null;

    return (
        <Row noGutters={true}>

            <SectionNavbar title={"My Dashboard"} icon={faGamepad} />

            <Row noGutters={true} className="w-100 p-2">
                <Col lg={6} xs={12}>
                    <ProjectDescSection {...currentProject} />

                    <SectionContainer title={"General Info"} icon={faInfoCircle} >
                        <p>{currentProject.generalInfo}</p>
                    </SectionContainer>
                </Col>

                <Col lg={6} xs={12} className="pl-lg-2 pl-0">
                    <SectionContainer title={"Metrics"} icon={faChartPie}>
                        <ProjectMetrics />
                    </SectionContainer>
                </Col>
            </Row>

        </Row>
    );
};

export default ProjectDashboard;