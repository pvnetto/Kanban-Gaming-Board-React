import React from 'react';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';

import SectionNavbarButton from './SectionNavbarButton';
import SectionNavbarLink from './SectionNavbarLink';

const SectionNavbar = (props) => {
    return (
        <Row noGutters={true} className="w-100">
            <Col xs={12} className="bg-dark border-2 border-light border-top-0 p-2">

                <div className="d-flex flex-row">
                    <div className="ml-2 d-flex flex-row align-items-center">
                        <FontAwesomeIcon icon={props.sectionIcon} />
                        <h5 className="font-weight-bold emphasized ml-2">
                            {props.sectionTitle}
                        </h5>
                    </div>

                    <div className="ml-3 d-flex flex-row align-items-center">
                        {props.children}
                    </div>
                </div>
                {props.options}

            </Col>
        </Row>
    );
};

SectionNavbar.Button = SectionNavbarButton;
SectionNavbar.Link = SectionNavbarLink;

export default SectionNavbar;