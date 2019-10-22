import React, { useContext } from 'react';
import SectionNavbar from '../../commons/SectionNavbar';
import SectionContainer from '../../commons/SectionContainer';
import UserMetrics from '../../user/UserMetrics';

import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faChartPie, faDiceD20, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import BoardsContext from '../../contexts/BoardsContext';

const ProjectDescSection = ({ title, description }) => {
    return (
        <div className="p-4 mb-2 bg-dark border-2 border-radius-5 border-light d-flex flex-column justify-content-center align-items-center">
            <FontAwesomeIcon className="icon-xl" icon={faDiceD20} />
            <h1 className="font-weight-bold mt-3">{title}</h1>
            <p>{description}</p>
        </div>
    );
}

const ProjectDashboard = (props) => {
    const boardsContext = useContext(BoardsContext);

    return (
        <Row noGutters={true}>

            <SectionNavbar sectionTitle={"My Dashboard"} sectionIcon={faGamepad} items={[]} />

            <Row noGutters={true} className="w-100 p-2">
                <Col xs={6}>
                    <ProjectDescSection {...boardsContext.project} />

                    <SectionContainer title={"General Info"} titleIcon={faInfoCircle} >
                        <p>{boardsContext.project.generalInfo}</p>
                    </SectionContainer>
                </Col>


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