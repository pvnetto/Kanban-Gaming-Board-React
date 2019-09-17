import React from 'react';
import ProjectItem from '../project/ProjectItem';
import UserMetrics from './UserMetrics';
import SectionContainer from '../commons/SectionContainer'
import SectionNavbar from '../commons/SectionNavbar';
import { Row, Col } from 'react-bootstrap';

const UserDashboard = () => {
    const projectItems = [
        <ProjectItem />,
        <ProjectItem />,
        <ProjectItem />,
    ];

    return (
        <>
            {/* Section navbar */}
            <Row noGutters={true} className="w-100">
                <Col xs={12}>
                    <SectionNavbar sectionTitle={"My Dashboard"} sectionIcon={"DS"} items={[]} />
                </Col>
            </Row>

            <Row noGutters={true} className="w-100 p-2">
                {/* Left dashboard section */}
                <Col xs={6}>
                    <div className="p-4 mb-2 bg-dark border-2 border-light d-flex flex-row justify-content-center">
                        <h3 className="font-weight-bold">Welcome, {"Username"}</h3>
                    </div>

                    <SectionContainer title={"Your Projects"} titleIcon={"PRI"} items={projectItems} noItemsMsg={"You don't have any active projects."} />
                    <SectionContainer title={"Closed Projects"} titleIcon={"CPR"} items={[]} noItemsMsg={"You don’t have any closed projects."} />
                </Col>

                <Col xs={6} className="pl-2">
                    {/* Right dashboard section */}
                    <SectionContainer title={"Metrics"} titleIcon={"MTR"} items={[<UserMetrics />]} />
                </Col>
            </Row>

        </>
    );
};

export default UserDashboard;