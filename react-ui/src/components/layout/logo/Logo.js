import React from 'react';

import styles from './logo.module.scss';

const LogoBlue = ({ className, children }) => <span className={`${className} ${styles.blue}`}>{children}</span>

const LogoRed = ({ className, children }) => <span className={`${className} ${styles.red}`}>{children}</span>

const LogoGreen = ({ className, children }) => <span className={`${className} ${styles.green}`}>{children}</span>

const Logo = ({ className, children }) => {
    return (
        <div className={`${className} ${styles.logo}`}>
            {children}
        </div>
    );
};

Logo.Blue = LogoBlue;
Logo.Red = LogoRed;
Logo.Green = LogoGreen;

export default Logo;