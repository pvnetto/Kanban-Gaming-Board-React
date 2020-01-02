import React from 'react';
import { Provider } from 'react-redux';

import store from './components/dispatchers/store';
import AppRouter from './AppRouter';

const KGBApp = () => {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    );
};

export default KGBApp;