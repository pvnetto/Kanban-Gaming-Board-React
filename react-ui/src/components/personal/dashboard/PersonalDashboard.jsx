import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { faGamepad, faDiceD20, faHourglassEnd, faChartPie } from '@fortawesome/free-solid-svg-icons';

import ProjectItem from '../../utils/ProjectItem';
import SectionContainer from '../../layout/section/SectionContainer'
import SectionNavbar from '../../layout/section/SectionNavbar';
import Spinner from '../../utils/spinners/Spinner';
import TaskMetrics from './metrics/TaskMetrics';


const PersonalDashboard = () => {
    const user = useSelector(state => state.auth.user);
    const projects = useSelector(state => state.projects.projects);
    const isLoading = useSelector(state => state.projects.isLoading);

    const closedProjects = [];

    return (
        <Row noGutters={true}>

            <SectionNavbar title={"My Dashboard"} icon={faGamepad} />

            <Row noGutters={true} className="w-100 p-2">
                {/* Left dashboard section */}
                <Col xs={6}>
                    <div className="p-4 mb-2 bg-dark border-2 border-radius-5 border-light d-flex flex-row justify-content-center">
                        <h3 className="font-weight-bold">Welcome, {user.name}!</h3>
                    </div>

                    <SectionContainer title={"Your Projects"} icon={faDiceD20}>
                        {isLoading ?
                            <Spinner size={'sm'} /> :
                            projects.map((project, idx) => <ProjectItem key={idx} {...project} />)}
                    </SectionContainer>

                    <SectionContainer title={"Closed Projects"} icon={faHourglassEnd} >
                        {isLoading ?
                            <Spinner size={'sm'} /> :

                            closedProjects.length > 0 ?
                                closedProjects
                                : <p className="text-center">You have no closed projects.</p>}
                    </SectionContainer>
                </Col>

                {/* Right dashboard section */}
                <Col xs={6} className="pl-2">
                    <SectionContainer title={"Metrics"} icon={faChartPie}>
                        {isLoading ?
                            <Spinner size={'sm'} /> :
                            <TaskMetrics />}
                    </SectionContainer>
                </Col>
            </Row>

        </Row>
    );
};

export default PersonalDashboard;