import React, { useEffect } from 'react';
import { useAuth0 } from '../../auth0-wrapper';


const LoginRedirect = (props) => {

    const { isAuthenticated, loginThroughCallback } = useAuth0();

    useEffect(() => {
        const authenticate = async () => {
            if (!isAuthenticated) {
                await loginThroughCallback();
            }
            props.history.push("workspace/dashboard");
        }

        authenticate();
    }, []);

    return (
        <div></div>
    );
};

export default LoginRedirect;