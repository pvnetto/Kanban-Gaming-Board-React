import React, { useState, useEffect, useContext } from 'react';
import ProjectItem from '../../commons/ProjectItem';
import UserMetrics from '../UserMetrics';
import SectionContainer from '../../commons/SectionContainer'
import SectionNavbar from '../../commons/SectionNavbar';

import { Row, Col } from 'react-bootstrap';
import { faGamepad, faDiceD20, faHourglassEnd, faChartPie } from '@fortawesome/free-solid-svg-icons';
import ProjectsContext from '../../contexts/ProjectContext';
import UserContext from '../../contexts/UserContext';
import Firebase from '../../../firebase';

const WelcomeSection = ({ username }) => {
    return (
        <div className="p-4 mb-2 bg-dark border-2 border-radius-5 border-light d-flex flex-row justify-content-center">
            <h3 className="font-weight-bold">Welcome, {username}!</h3>
        </div>
    );
}

const UserDashboard = (props) => {
    const { name, auth0Client, setFirebaseClient, setUser } = useContext(UserContext);
    const projectsContext = useContext(ProjectsContext);

    const projectItems = projectsContext.projects.map((project, idx) => <ProjectItem key={idx} {...project} />)
    const closedProjects = [];

    let [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const authenticate = async () => {
            setAuthenticated(false);

            const loggedInThroughCallback = await auth0Client.handleCallback();
            if (loggedInThroughCallback) {
                console.log("Logged in");
                await setFirebaseCustomToken();

                let profile = auth0Client.getProfile();
                setUser({
                    name: profile.given_name,
                    avatarUrl: profile.picture
                });

                console.log(profile);
            }
            else {
                // signIn();
                console.log("Not logged in through callback");
            }
        }

        authenticate();
    }, []);

    async function setFirebaseCustomToken() {
        const firebaseClient = new Firebase();

        const response = await fetch('http://localhost:3001/firebase', {
            headers: {
                Authorization: `Bearer ${auth0Client.getAccessToken()}`,
            },
        });

        const data = await response.json();
        await firebaseClient.setToken(data.firebaseToken);
        await firebaseClient.updateProfile(auth0Client.getProfile());

        setAuthenticated(true);
        setFirebaseClient(firebaseClient);
    }

    return (
        <Row noGutters={true}>

            <SectionNavbar sectionTitle={"My Dashboard"} sectionIcon={faGamepad} items={[]} />

            <Row noGutters={true} className="w-100 p-2">
                {/* Left dashboard section */}
                <Col xs={6}>
                    <WelcomeSection username={name} />
                    <SectionContainer title={"Your Projects"} titleIcon={faDiceD20}>
                        {projectItems.length > 0 ?
                            projectItems :
                            <p className="text-center">You have no active projects.</p>}
                    </SectionContainer>

                    <SectionContainer title={"Closed Projects"} titleIcon={faHourglassEnd} >
                        {closedProjects.length > 0 ?
                            closedProjects :
                            <p className="text-center">You have no closed projects.</p>}
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

export default UserDashboard;