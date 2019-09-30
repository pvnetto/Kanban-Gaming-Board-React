import React from 'react';
import { Auth0Provider } from './auth0-wrapper';
import AppRouter from './AppRouter';

const KGBApp = () => {
    return (
        <Auth0Provider>
            <AppRouter/>
        </Auth0Provider>
    );
};

export default KGBApp;