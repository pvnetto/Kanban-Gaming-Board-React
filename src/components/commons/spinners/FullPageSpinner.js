import React from 'react';
import LoadingSpinner from './LoadingSpinner';

import './FullPageSpinner.scss';

const FullPageSpinner = () => {
    return (
        <div className="full-page-overlay full-page-overlay-bg d-flex flex-row align-items-center justify-content-center">
            <LoadingSpinner size={'lg'} />
        </div>
    );
};

export default FullPageSpinner;