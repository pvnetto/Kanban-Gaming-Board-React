import React from 'react';
import ProjectItem from '../../commons/ProjectItem';
import UserMetrics from '../UserMetrics';
import SectionContainer from '../../commons/SectionContainer'
import SectionNavbar from '../../commons/SectionNavbar';

import { Row, Col } from 'react-bootstrap';
import { faGamepad, faDiceD20, faHourglassEnd, faChartPie } from '@fortawesome/free-solid-svg-icons';


const WelcomeSection = ({ username }) => {
    return (
        <div className="p-4 mb-2 bg-dark border-2 border-light d-flex flex-row justify-content-center">
            <h3 className="font-weight-bold">Welcome, {username}!</h3>
        </div>
    );
}

const UserDashboard = (props) => {
    const projectItems = props.user.projects.map(project => <ProjectItem {...project} />)

    return (
        <Row noGutters={true}>

            <SectionNavbar sectionTitle={"My Dashboard"} sectionIcon={faGamepad} items={[]} />

            <Row noGutters={true} className="w-100 p-2">
                {/* Left dashboard section */}
                <Col xs={6}>
                    <WelcomeSection username={props.user.name} />
                    <SectionContainer title={"Your Projects"} titleIcon={faDiceD20} items={projectItems} noItemsMsg={"You don't have any active projects."} />
                    <SectionContainer title={"Closed Projects"} titleIcon={faHourglassEnd} items={[]} noItemsMsg={"You don’t have any closed projects."} />
                </Col>

                {/* Right dashboard section */}
                <Col xs={6} className="pl-2">
                    <SectionContainer title={"Metrics"} titleIcon={faChartPie} items={[<UserMetrics />]} />
                </Col>
            </Row>

        </Row>
    );
};

export default UserDashboard;