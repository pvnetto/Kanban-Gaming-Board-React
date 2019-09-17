import React from 'react';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';

const SectionNavbar = (props) => {
    return (
        <Row noGutters={true} className="w-100">
            <Col xs={12} className="bg-dark border-2 border-light border-top-0 p-3">

                <div className="d-flex flex-row align-items-center">
                    <FontAwesomeIcon icon={props.sectionIcon} />
                    <h4 className="font-weight-bold emphasized ml-2">
                        {props.sectionTitle}
                    </h4>
                </div>
                {props.options}

            </Col>
        </Row>
    );
};

export default SectionNavbar;