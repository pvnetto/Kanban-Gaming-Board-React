import React from 'react';
import LoginForm from './LoginForm';
import XboxImg from '../public/images/pexels_hand_xbox.jpeg';

import { Row, Col, Container } from 'react-bootstrap';

function LoginPage() {
  return (
    <div style={{ height: "100vh", backgroundImage: `url(${XboxImg})`, position: 'relative' }}>
      <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: `rgba(0, 0, 255, 0.3)` }}></div>

      <Container className="h-100 d-flex flex-row justify-content-center align-items-center">
        <Row className="w-100">
          <Col xs={6} className="d-flex flex-column justify-content-center align-items-center">
            <h1 className="align-self-start"><span>K</span>anban</h1>
            <h1><span>G</span>aming</h1>
            <h1 className="align-self-end"><span>B</span>oard</h1>
          </Col>

          <Col xs={6} className="d-flex flex-column justify-content-center align-items-center">
            <LoginForm />
          </Col>
        </Row>
      </Container>

    </div>
  );
}

export default LoginPage;
