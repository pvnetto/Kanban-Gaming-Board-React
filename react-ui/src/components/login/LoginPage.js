import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Container, Button } from 'react-bootstrap';

import LoginForm from './LoginForm';
import XboxImg from '../../assets/images/action-analogue.jpg';
import Logo from '../layout/logo/Logo';

import styles from './login.module.scss';

function LoginPage({ history }) {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/workspace/dashboard');
    }
  }, []);

  return (
    <div style={{ height: "100vh", position: 'relative' }}>

      <Container fluid className="h-100 d-flex flex-row justify-content-center align-items-center p-0 bg-primary">
        <Row className="w-100 h-100">

          <Col xl={4} md={6} xs={12} className="d-flex flex-column justify-content-center align-items-center border border-light">
            <div>
              <Logo>
                <Logo.Blue className={`${styles.logoMd} align-self-start d-inline`}>
                  <span className={styles.capital}>K</span>anban
                </Logo.Blue>
                <Logo.Red className={`${styles.logoLg} d-inline`}>
                  <span className={styles.capital}>G</span>aming
                </Logo.Red>
                <Logo.Green className={`${styles.logoMd} align-self-end d-inline`}>
                  <span className={styles.capital}>B</span>oard
                </Logo.Green>
              </Logo>

              <div className="mb-4 text-center">
                <p>Welcome to Kanban Gaming Board!</p>
              </div>
            </div>

            <LoginForm />

            <div className="pb-4 justify-self-end">
              <p className="text-sm">Made by Paiva | <a href="">GitHub</a></p>
            </div>
          </Col>

          <Col style={{ backgroundImage: `url(${XboxImg})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
            className="d-md-flex d-none flex-column justify-content-center align-items-center text-center"
            xl={8} md={6} xs={0}>

            <div className="bg-overlay"></div>

            <div className="position-absolute d-flex flex-column align-items-center justify-content-center p-4">
              <h1 className="mb-2">Let's make some awesome games!</h1>
              <p className="text-center">Create a new project, invite your team and assign their tasks. It's that simple!</p>
              <Button variant="outline-light" className="mt-2">Check this project on GitHub</Button>
            </div>
          </Col>
        </Row>
      </Container>

    </div >
  );
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
}

export default LoginPage;
