import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

import UserContext from '../contexts/UserContext';

const NavigationBar = (props) => {

    const userContext = useContext(UserContext);

    return (
        <Row noGutters={true} className="w-100 bg-dark border-2 border-light pl-3 py-1">
            <Col xs={12} className="d-flex flex-row justify-content-between align-items-center">
                <div>
                    <FontAwesomeIcon className="icon-md mr-2" icon={faCodeBranch} />
                    <p className="d-inline">Workspace &#9658; {"Enter current section"}</p>
                </div>

                <div>
                    <img className="profile-picture mr-2" src={userContext.avatarUrl} alt="" />
                    <button onClick={userContext.updateUserName} >{userContext.name}</button>
                </div>
            </Col>
        </Row>
    );
};

export default NavigationBar;