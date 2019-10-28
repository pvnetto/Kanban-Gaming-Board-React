import React, { useEffect } from 'react';
import { useAuth0 } from '../../auth0-wrapper';

import FullPageSpinner from '../commons/spinners/FullPageSpinner';


const LogoutRedirect = ({ history }) => {
    const { isAuthenticated, signOut } = useAuth0();

    useEffect(() => {
        const logout = async () => {
            if (isAuthenticated) {
                await signOut();
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

export default LogoutRedirect;