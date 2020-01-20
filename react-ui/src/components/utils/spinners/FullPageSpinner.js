import React from 'react';
import Spinner from './Spinner';

import styles from './spinner.module.scss';

const FullPageSpinner = () => {
    return (
        <div className={`${styles.fullPageOverlay} d-flex flex-row align-items-center justify-content-center`}>
            <Spinner size={'lg'} />
        </div>
    );
};

export default FullPageSpinner;