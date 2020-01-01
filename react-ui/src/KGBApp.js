import React from 'react';
import { Provider } from 'react-redux';

import store from './components/contexts/store';
import AppRouter from './AppRouter';

const KGBApp = () => {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    );
};

export default KGBApp;