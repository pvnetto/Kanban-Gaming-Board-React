import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const FullPageSpinner = () => {
    return (
        <div className="d-flex flex-row align-items-center" style={{ width: '100vw', height: '100vh' }}>
            <LoadingSpinner size={'lg'} />
        </div>
    );
};

export default FullPageSpinner;