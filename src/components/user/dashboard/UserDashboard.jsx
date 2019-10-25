import React from 'react';
import ProjectItem from '../../commons/ProjectItem';
import SectionContainer from '../../commons/SectionContainer'
import SectionNavbar from '../../commons/SectionNavbar';

import { Row, Col } from 'react-bootstrap';
import { faGamepad, faDiceD20, faHourglassEnd, faChartPie } from '@fortawesome/free-solid-svg-icons';
import { useProjects } from '../../contexts/ProjectContext';
import { useAuth0 } from '../../../auth0-wrapper';
import LoadingSpinner from '../../commons/LoadingSpinner';
import TaskMetrics from '../metrics/TaskMetrics';

const WelcomeSection = ({ username }) => {
    return (
        <div className="p-4 mb-2 bg-dark border-2 border-radius-5 border-light d-flex flex-row justify-content-center">
            <h3 className="font-weight-bold">Welcome, {username}!</h3>
        </div>
    );
}

const UserDashboard = (props) => {
    const { user } = useAuth0();
    const { projects, isLoadingProjects } = useProjects();

    const closedProjects = [];

    return (
        <Row noGutters={true}>

            <SectionNavbar sectionTitle={"My Dashboard"} sectionIcon={faGamepad} items={[]} />

            <Row noGutters={true} className="w-100 p-2">
                {/* Left dashboard section */}
                <Col xs={6}>
                    <WelcomeSection username={user.name} />
                    <SectionContainer title={"Your Projects"} titleIcon={faDiceD20}>
                        {isLoadingProjects ?
                            <LoadingSpinner size={'sm'} /> :
                            projects.map((project, idx) => <ProjectItem key={idx} {...project} />)}
                    </SectionContainer>

                    <SectionContainer title={"Closed Projects"} titleIcon={faHourglassEnd} >
                        {isLoadingProjects ?
                            <LoadingSpinner size={'sm'} /> :

                            closedProjects.length > 0 ?
                                closedProjects
                                : <p className="text-center">You have no closed projects.</p>}
                    </SectionContainer>
                </Col>

                {/* Right dashboard section */}
                <Col xs={6} className="pl-2">
                    <SectionContainer title={"Metrics"} titleIcon={faChartPie}>
                        {isLoadingProjects ?
                            <LoadingSpinner size={'sm'} /> :
                            <TaskMetrics />}
                    </SectionContainer>
                </Col>
            </Row>

        </Row>
    );
};

export default UserDashboard;