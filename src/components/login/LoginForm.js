import React from 'react';
import { faFacebookSquare, faGoogle, faGit } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginForm = () => {
    return (
        <div className="p-4 bg-primary border border-radius-5 border-light" style={{ width: '60%' }}>
            <form className="form-group d-flex flex-column mb-4" action="">
                <input className="form-control mb-2" placeholder="Login" type="text" />
                <input className="form-control mb-2" placeholder="Password" type="password" />
                <button className="btn btn-lg btn-red">Login</button>
            </form>

            <div className="d-flex flex-row pt-4">
                <button className="btn btn-lg btn-green flex-grow-1"><FontAwesomeIcon icon={faGoogle} /></button>
                <button className="btn btn-lg btn-blue mx-2 flex-grow-1"><FontAwesomeIcon icon={faFacebookSquare} /></button>
                <button className="btn btn-lg btn-light flex-grow-1"><FontAwesomeIcon icon={faGit} /></button>
            </div>
        </div>
    );
};

export default LoginForm;