import React from 'react';
import UserDashboard from './UserDashboard';
import SidenavButton from '../commons/SidenavButton';
import Sidenav from '../commons/Sidenav';
import NavigationBar from '../commons/NavigationBar';

import { Container, Row, Col } from 'react-bootstrap';

const UserWorkspace = () => {
    const sidenavBtns = [
        <SidenavButton btnTitle={"CREATE PROJECT"} btnIcon={"+"} />,
        <SidenavButton btnTitle={"MY DASHBOARD"} btnIcon={"D"} />,
        <SidenavButton btnTitle={"MANAGEMENT"} btnIcon={"M"} />
    ];


    return (

        <>
            <Sidenav buttons={sidenavBtns} options={[]} />

            <Container fluid={true} className="bg-primary p-0">
                <div className="workspace">
                    <Row noGutters={true} className="w-100">
                        <Col xs={12}>
                            <NavigationBar />
                        </Col>
                    </Row>

                    <Row noGutters={true}>
                        <Col xs={12}>
                            {/* Switch between difference sections, maybe use higher order components to render current section */}
                            <UserDashboard />
                        </Col>
                    </Row>
                </div>
            </Container>
        </>
    );
};

export default UserWorkspace;