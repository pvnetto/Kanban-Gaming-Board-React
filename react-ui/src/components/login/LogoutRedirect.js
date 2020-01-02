import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { signOut } from '../dispatchers/auth/auth-actions-async';
import FullPageSpinner from '../commons/spinners/FullPageSpinner';


const LogoutRedirect = ({ history }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        const logout = async () => {
            if (isAuthenticated) {
                await dispatch(signOut());
            }

            history.push("login");
        }

        logout();
    }, []);

    return (
        <div className="bg-primary w-100" style={{ height: '100vh' }}>
            <FullPageSpinner />
        </div>
    );
};

LogoutRedirect.propTypes = {
    history: PropTypes.object.isRequired,
};

export default LogoutRedirect;