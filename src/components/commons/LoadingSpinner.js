import React from 'react';
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingSpinner = () => {
    console.log("spinning");
    return (
        <div className={"bg-dark position-fixed d-flex flex-row justify-content-center align-items-center"} style={{ width: '100vw', height: '100vh', zIndex: '100' }}>
            <div className="loading-spinner">
                <FontAwesomeIcon style={{ width: '300px', height: '300px' }} icon={faSpinner} />
            </div>
        </div>
    );
};

export default LoadingSpinner;