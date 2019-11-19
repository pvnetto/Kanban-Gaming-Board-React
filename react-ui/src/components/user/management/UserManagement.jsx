import React, { useContext } from 'react';
import SectionContainer from '../../commons/SectionContainer';
import ProjectItem from '../../commons/ProjectItem';

import { Row, Col } from 'react-bootstrap'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import WorkspaceContext from '../../contexts/WorkspaceContext';

const UserManagement = () => {
    const projectsContext = useContext(WorkspaceContext);
    const projectItems = projectsContext.projects.map((project, idx) => <ProjectItem key={idx} {...project} redirect={'/management'} />);

    return (

        <Row noGutters={true}>
            <Col className="w-100 p-2" xs={4}>
                <SectionContainer title={"Your Projects"} icon={faDiceD20}>
                    {projectItems.length > 0 ?
                        projectItems :
                        <p className="text-center">You don't have any project to manage.</p>}
                </ SectionContainer>
            </Col>
        </Row>
    );
};

export default UserManagement;