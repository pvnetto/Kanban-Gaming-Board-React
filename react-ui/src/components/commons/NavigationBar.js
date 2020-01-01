import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';


const NavigationBar = ({ children }) => {

    const user = useSelector(state => state.auth.user);

    return (
        <Row noGutters={true} className="w-100 bg-dark border-2 border-light pl-3 py-1">
            <Col xs={12} className="d-flex flex-row justify-content-between align-items-center">
                <div>
                    <FontAwesomeIcon className="icon-md mr-2" icon={faCodeBranch} />

                    {React.Children.map(children, (child, index) => (
                        <>
                            {child}
                            {index < React.Children.count(children) - 1 ?
                                <p className="d-inline mx-2">&#9658;</p> :
                                null
                            }
                        </>
                    ))}
                </div>

                <div>
                    <img className="profile-picture mr-2" src={user.avatarUrl} alt="" />
                </div>
            </Col>
        </Row>
    );
};

NavigationBar.propTypes = {
    children: PropTypes.node,
}

export default NavigationBar;