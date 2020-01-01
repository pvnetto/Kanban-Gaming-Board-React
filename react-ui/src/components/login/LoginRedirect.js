import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { callbackAuthentication } from '../../auth0/auth-actions';

const LoginRedirect = ({ history }) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const authenticate = async () => {
            if (!isAuthenticated) {
                await dispatch(callbackAuthentication());
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