import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';

import SectionNavbarButton from './SectionNavbarButton';
import SectionNavbarLink from './SectionNavbarLink';

const SectionNavbar = ({ title, icon, children }) => {
    return (
        <Row noGutters={true} className="w-100">
            <Col xs={12} className="bg-dark border-2 border-light border-top-0 p-2">

                <div className="d-flex flex-row">
                    <div className="ml-2 d-flex flex-row align-items-center">
                        <FontAwesomeIcon icon={icon} />
                        <h5 className="font-weight-bold emphasized ml-2">
                            {title}
                        </h5>
                    </div>

                    <div className="ml-3 d-flex flex-row align-items-center">
                        {children}
                    </div>
                </div>
            </Col>
        </Row>
    );
};

SectionNavbar.Button = SectionNavbarButton;
SectionNavbar.Link = SectionNavbarLink;
SectionNavbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    children: PropTypes.node,
};

export default SectionNavbar;