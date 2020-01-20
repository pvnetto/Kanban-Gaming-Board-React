import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './spinner.module.scss';

const getDimensions = (size) => {
    switch (size) {
        case 'lg':
            return { width: '300px', height: '300px' };
        case 'md':
            return { width: '200px', height: '200px' };
        case 'sm':
            return { width: '100px', height: '100px' };
        default:
            return { width: '100px', height: '100px' };
    }
}

const Spinner = ({ size }) => {
    return (
        <div className={"d-flex flex-row justify-content-center align-items-center"} style={{ width: '100%', zIndex: '100' }}>
            <div className={styles.spinner}>
                <FontAwesomeIcon style={{ ...getDimensions(size) }} icon={faSpinner} />
            </div>
        </div>
    );
};

Spinner.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']).isRequired,
}

export default Spinner;