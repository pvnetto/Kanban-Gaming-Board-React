import React from 'react';
import LoginForm from './LoginForm';
import XboxImg from '../../assets/images/pexels_hand_xbox.jpeg';

import { Row, Col, Container } from 'react-bootstrap';

function LoginPage() {

  return (
    <div style={{ height: "100vh", backgroundImage: `url(${XboxImg})`, position: 'relative' }}>
      <div className="bg-overlay"></div>

      <Container className="h-100 d-flex flex-row justify-content-center align-items-center">
        <Row className="w-100">
          <Col xs={6} className="logo logo-lg d-flex flex-column justify-content-center align-items-center">
            <h1 className="logo-blue logo-md align-self-start"><span className="capital">K</span>anban</h1>
            <h1 className="logo-red logo-lg"><span className="capital">G</span>aming</h1>
            <h1 className="logo-green logo-md align-self-end"><span className="capital">B</span>oard</h1>
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
