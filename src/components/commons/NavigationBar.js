import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

import { Row, Col } from 'react-bootstrap';

const NavigationBar = () => {
    return (
        <Row noGutters={true} className="w-100">
            <Col xs={12}>
                <div className="w-100 d-flex flex-row align-items-center bg-dark border-2 border-light pl-3 py-2">
                    <FontAwesomeIcon className="icon-md mr-2" icon={faCodeBranch} />
                    <p>Workspace &#9658; {"Enter current section"}</p>
                </div>
            </Col>
        </Row>
    );
};

export default NavigationBar;