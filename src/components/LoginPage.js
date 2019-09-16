import React from 'react';
import LoginForm from './LoginForm';
import XboxImg from '../public/images/pexels_hand_xbox.jpeg';

// import { Row, Column, Container } from 'bo'

function LoginPage() {
  return (
    <div style={{ height: "100vh", backgroundImage: `url(${XboxImg})`, position: 'relative' }}>
      <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: `rgba(0, 0, 255, 0.3)` }}></div>

      <div style={{ height: "100%" }} className="container d-flex flex-row justify-content-center align-items-center">
        <div className="row w-100">

          <div className="col-6 d-flex flex-column justify-content-center align-items-center">
            <h1 className="align-self-start"><span>K</span>anban</h1>
            <h1><span>G</span>aming</h1>
            <h1 className="align-self-end"><span>B</span>oard</h1>
          </div>

          <div className="col-6 d-flex flex-column justify-content-center align-items-center">
            <LoginForm />
          </div>

        </div>
      </div>

    </div>
  );
}

export default LoginPage;
