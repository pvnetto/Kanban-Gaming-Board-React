import React from 'react';
import SectionNavbar from '../../commons/SectionNavbar';
import SectionContainer from '../../commons/SectionContainer';
import UserMetrics from '../../user/UserMetrics';

import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faChartPie, faDiceD20 } from '@fortawesome/free-solid-svg-icons';

const ProjectDescSection = ({ title, description }) => {
    return (
        <div className="p-4 mb-2 bg-dark border-2 border-light d-flex flex-column justify-content-center align-items-center">
            <FontAwesomeIcon className="icon-xl" icon={faDiceD20} />
            <h1 className="font-weight-bold mt-3">{title}</h1>
            <p>{description}</p>
        </div>
    );
}

const ProjectDashboard = (props) => {

    return (
        <Row noGutters={true}>

            <SectionNavbar sectionTitle={"My Dashboard"} sectionIcon={faGamepad} items={[]} />

            <Row noGutters={true} className="w-100 p-2">
                {/* Left dashboard section */}
                <Col xs={6}>
                    <ProjectDescSection {...props.project} />

                    <SectionContainer title={"General Info"} titleIcon={"GI"} >
                        <p>{props.project.generalInfo}</p>
                    </SectionContainer>
                </Col>

                {/* Right dashboard section */}
                <Col xs={6} className="pl-2">
                    <SectionContainer title={"Metrics"} titleIcon={faChartPie}>
                        <UserMetrics />
                    </SectionContainer>
                </Col>
            </Row>

        </Row>
    );
};

export default ProjectDashboard;