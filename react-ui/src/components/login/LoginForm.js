import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { faFacebookSquare, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { loginWithGoogle, loginWithFacebook } from '../dispatchers/auth/auth-actions-async';

import styles from './login.module.scss';

const LoginForm = () => {

    const auth0Client = useSelector(state => state.auth.auth0Client);

    return (
        <div className={`p-md-4 p-2 ${styles.loginForm}`}>
            <form className="form-group d-flex flex-column mb-4" action="">
                <input className="form-control mb-2" placeholder="Login" type="text" />
                <input className="form-control mb-2" placeholder="Password" type="password" />

                <div className="d-flex flex-row align-items-stretch flex-fill">
                    <Button variant="outline-warning" className="w-100 mr-2">Sign Up</Button>
                    <Button variant="warning" className="w-100">Login</Button>
                </div>
            </form>

            <div className="d-flex flex-row align-items-center">
                <hr className="w-100 border border-light" />
                <span className="mx-3">OR</span>
                <hr className="w-100 border border-light" />
            </div>

            <div className="d-flex flex-column pt-4">
                <Button variant="danger" className="d-flex flex-row align-items-center justify-content-start" onClick={() => loginWithGoogle(auth0Client)}>
                    <FontAwesomeIcon icon={faGoogle} className="mx-2" />
                    <span className="ml-4">Sign in with Google</span>
                </Button>
                <Button variant="info" className="my-2 d-flex flex-row align-items-center justify-content-start" onClick={() => loginWithFacebook(auth0Client)}>
                    <FontAwesomeIcon icon={faFacebookSquare} className="mx-2" />
                    <span className="ml-4">Sign in with Facebook</span>
                </Button>
            </div>
        </div>
    );
};

export default LoginForm;