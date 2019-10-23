import React, { useEffect } from 'react';
import LoginForm from './LoginForm';
import XboxImg from '../../assets/images/action-analogue.jpg';

import { Row, Col, Container, Button } from 'react-bootstrap';
import { useAuth0 } from '../../auth0-wrapper';

function LoginPage({ history }) {

  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/workspace/dashboard');
    }
  }, []);

  return (
    <div style={{ height: "100vh", position: 'relative' }}>

      <Container fluid className="h-100 d-flex flex-row justify-content-center align-items-center p-0 bg-primary">
        <Row className="w-100 h-100">

          <Col xs={4} className="d-flex flex-column justify-content-center align-items-center border border-light">
            <div>
              <div className="logo logo-md">
                <h1 className="logo-blue logo-md align-self-start d-inline"><span className="capital">K</span>anban</h1>
                <h1 className="logo-red logo-lg d-inline"><span className="capital">G</span>aming</h1>
                <h1 className="logo-green logo-md align-self-end d-inline"><span className="capital">B</span>oard</h1>
              </div>
              <div className="my-4 text-center">
                <p>Welcome to Kanban Gaming Board!</p>
              </div>
            </div>

            <LoginForm />

            <div className="pb-4 justify-self-end">
              <p className="text-sm">Made by Paiva | <a href="">GitHub</a></p>
            </div>
          </Col>

          <Col style={{ backgroundImage: `url(${XboxImg})`, backgroundPosition: 'center', backgroundSize: 'cover' }} xs={8} className="d-flex flex-column justify-content-center align-items-center">
            <div className="bg-overlay"></div>

            <div className="position-absolute d-flex flex-column align-items-center justify-content-center">
              <h1>Let's make some awesome games!</h1>
              <p className="text-center">Create a new project, invite your team and assign their tasks. It's that simple!</p>
              <Button variant="outline-light" className="mt-4">Check this project on GitHub</Button>
            </div>
          </Col>
        </Row>
      </Container>

    </div >
  );
}

export default LoginPage;
