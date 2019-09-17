import React from 'react';
import { Row, Col } from '../../node_modules/react-bootstrap';

const ErrorPage = () => {
    return (
        <Row className="w-100">
            <Col xs={12}>
                <h1 className="text-center">Page not found {"):"}</h1>
            </Col>
        </Row>
    );
};

export default ErrorPage;