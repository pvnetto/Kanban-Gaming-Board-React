import React from 'react';

const LoginForm = () => {
    return (
        <div style={{ width: '75%' }}>
            <form className="form-group d-flex flex-column mb-4" action="">
                <input className="form-control mb-2" placeholder="Login" type="text" />
                <input className="form-control mb-2" placeholder="Password" type="password" />
                <button className="btn btn-lg btn-red">Login</button>
            </form>

            <div className="d-flex flex-column pt-4">
                <button className="btn btn-lg btn-green py-3 mb-2">Login with Google</button>
                <button className="btn btn-lg btn-blue py-3 mb-2">Login with Facebook</button>
                <button className="btn btn-lg btn-primary py-3 mb-2">Login with GitHub</button>
            </div>
        </div>
    );
};

export default LoginForm;