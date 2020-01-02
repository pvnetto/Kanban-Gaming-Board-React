import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { callbackAuthentication } from '../dispatchers/auth/auth-actions-async';

const LoginRedirect = ({ history }) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
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