import React from 'react';

const LoginForm = () => {
    return (
        <div style={{ width: '75%' }}>
            <form className="form-group d-flex flex-column mb-4" action="">
                <input className="form-control mb-2" placeholder="Login" type="text" />
                <input className="form-control mb-2" placeholder="Password" type="password" />
                <button className="btn btn-lg btn-primary">Login</button>
            </form>

            <div className="d-flex flex-column pt-4">
                <button className="btn btn-lg btn-secondary mb-1">Login with Google</button>
                <button className="btn btn-lg btn-danger mb-1">Login with Facebook</button>
                <button className="btn btn-lg btn-primary mb-1">Login with GitHub</button>
            </div>
        </div>
    );
};

export default LoginForm;