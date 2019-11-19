import React, { useContext } from 'react';
import SectionNavbar from '../../commons/SectionNavbar';
import SectionContainer from '../../commons/SectionContainer';

import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faChartPie, faDiceD20, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useBoards } from '../../contexts/BoardsContext';
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
    const { project } = useBoards();

    return (
        <Row noGutters={true}>

            <SectionNavbar title={"My Dashboard"} icon={faGamepad} />

            <Row noGutters={true} className="w-100 p-2">
                <Col xs={6}>
                    <ProjectDescSection {...project} />

                    <SectionContainer title={"General Info"} icon={faInfoCircle} >
                        <p>{project.generalInfo}</p>
                    </SectionContainer>
                </Col>


                <Col xs={6} className="pl-2">
                    <SectionContainer title={"Metrics"} icon={faChartPie}>
                        <ProjectMetrics />
                    </SectionContainer>
                </Col>
            </Row>

        </Row>
    );
};

export default ProjectDashboard;