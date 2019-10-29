import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useAuth0 } from '../../auth0-wrapper';


const LoginRedirect = ({ history }) => {

    const { isAuthenticated, loginThroughCallback } = useAuth0();

    useEffect(() => {
        const authenticate = async () => {
            if (!isAuthenticated) {
                await loginThroughCallback();
            }
            history.push("workspace/dashboard");
        }

        authenticate();
    }, []);

    return (
        <div></div>
    );
};

LoginRedirect.propTypes = {
    history: PropTypes.object.isRequired,
}

export default LoginRedirect;